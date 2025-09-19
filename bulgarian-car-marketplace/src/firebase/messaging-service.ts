// src/firebase/messaging-service.ts
// Bulgarian Messaging Service for Car Marketplace

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  Unsubscribe
} from 'firebase/firestore';
import { db, BulgarianFirebaseUtils } from './firebase-config';

// Message Types
export type MessageType = 'question' | 'offer' | 'comment' | 'review' | 'general';

// Bulgarian Message Interface
export interface BulgarianMessage {
  id: string;
  carId: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  type: MessageType;
  subject: string;
  content: string;
  language: 'bg' | 'en';
  isRead: boolean;
  isArchived: boolean;
  attachments?: string[]; // URLs to Firebase Storage
  metadata?: {
    carMake?: string;
    carModel?: string;
    carYear?: number;
    carPrice?: number;
    offerAmount?: number;
    rating?: number; // For reviews
  };
  createdAt: Date;
  updatedAt: Date;
  replies?: BulgarianMessage[];
}

// Chat Room Interface
export interface ChatRoom {
  id: string;
  carId: string;
  participants: string[]; // User IDs
  participantNames: string[];
  lastMessage: BulgarianMessage;
  unreadCount: { [userId: string]: number };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Bulgarian Messaging Service
export class BulgarianMessagingService {
  private static instance: BulgarianMessagingService;
  private listeners: Map<string, Unsubscribe> = new Map();

  private constructor() {}

  static getInstance(): BulgarianMessagingService {
    if (!BulgarianMessagingService.instance) {
      BulgarianMessagingService.instance = new BulgarianMessagingService();
    }
    return BulgarianMessagingService.instance;
  }

  // Send a message
  async sendMessage(messageData: Omit<BulgarianMessage, 'id' | 'createdAt' | 'updatedAt' | 'isRead' | 'isArchived'>): Promise<string> {
    try {
      // Validate message content
      if (!this.validateMessageContent(messageData.content)) {
        throw new Error('Съдържанието на съобщението е невалидно или твърде дълго');
      }

      // Sanitize content
      const sanitizedContent = BulgarianFirebaseUtils.sanitizeBulgarianText(messageData.content);

      // Create message object
      const message: Omit<BulgarianMessage, 'id'> = {
        ...messageData,
        content: sanitizedContent,
        isRead: false,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'messages'), {
        ...message,
        createdAt: Timestamp.fromDate(message.createdAt),
        updatedAt: Timestamp.fromDate(message.updatedAt)
      });

      // Update chat room
      await this.updateChatRoom(messageData.carId, messageData.senderId, messageData.recipientId, message, docRef.id);

      // Send notification (if enabled)
      await this.sendMessageNotification(messageData.recipientId, message);

      return docRef.id;
    } catch (error: any) {
      throw this.handleMessagingError(error);
    }
  }

  // Send car inquiry
  async sendCarInquiry(
    carId: string,
    senderId: string,
    senderName: string,
    senderEmail: string,
    recipientId: string,
    recipientName: string,
    recipientEmail: string,
    inquiryType: 'question' | 'offer',
    content: string,
    offerAmount?: number
  ): Promise<string> {
    const messageData = {
      carId,
      senderId,
      senderName,
      senderEmail,
      recipientId,
      recipientName,
      recipientEmail,
      type: inquiryType as MessageType,
      subject: inquiryType === 'question' ? 'Запитване за автомобил' : 'Оферта за автомобил',
      content,
      language: 'bg' as const,
      metadata: offerAmount ? { offerAmount } : undefined
    };

    return this.sendMessage(messageData);
  }

  // Send review
  async sendReview(
    carId: string,
    senderId: string,
    senderName: string,
    senderEmail: string,
    recipientId: string,
    recipientName: string,
    recipientEmail: string,
    rating: number,
    review: string
  ): Promise<string> {
    const messageData = {
      carId,
      senderId,
      senderName,
      senderEmail,
      recipientId,
      recipientName,
      recipientEmail,
      type: 'review' as MessageType,
      subject: 'Отзив за автомобил',
      content: review,
      language: 'bg' as const,
      metadata: { rating }
    };

    return this.sendMessage(messageData);
  }

  // Get messages for user
  async getUserMessages(userId: string, options?: {
    type?: MessageType;
    isRead?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<BulgarianMessage[]> {
    try {
      let q = query(
        collection(db, 'messages'),
        where('recipientId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      if (options?.type) {
        q = query(q, where('type', '==', options.type));
      }

      if (options?.limit) {
        q = query(q, limit(options.limit));
      }

      const querySnapshot = await getDocs(q);
      const messages: BulgarianMessage[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as BulgarianMessage);
      });

      return messages;
    } catch (error: any) {
      throw this.handleMessagingError(error);
    }
  }

  // Get chat room messages
  async getChatRoomMessages(carId: string, userId: string, otherUserId: string): Promise<BulgarianMessage[]> {
    try {
      const q = query(
        collection(db, 'messages'),
        where('carId', '==', carId),
        where('senderId', 'in', [userId, otherUserId]),
        where('recipientId', 'in', [userId, otherUserId]),
        orderBy('createdAt', 'asc')
      );

      const querySnapshot = await getDocs(q);
      const messages: BulgarianMessage[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as BulgarianMessage);
      });

      return messages;
    } catch (error: any) {
      throw this.handleMessagingError(error);
    }
  }

  // Mark message as read
  async markMessageAsRead(messageId: string, userId: string): Promise<void> {
    try {
      const messageRef = doc(db, 'messages', messageId);
      const messageDoc = await getDoc(messageRef);

      if (!messageDoc.exists()) {
        throw new Error('Съобщението не е намерено');
      }

      const message = messageDoc.data() as BulgarianMessage;

      // Only recipient can mark as read
      if (message.recipientId !== userId) {
        throw new Error('Нямате права да маркирате това съобщение като прочетено');
      }

      await updateDoc(messageRef, {
        isRead: true,
        updatedAt: Timestamp.fromDate(new Date())
      });

      // Update chat room unread count
      await this.updateChatRoomUnreadCount(message.carId, message.senderId, message.recipientId);
    } catch (error: any) {
      throw this.handleMessagingError(error);
    }
  }

  // Archive message
  async archiveMessage(messageId: string, userId: string): Promise<void> {
    try {
      const messageRef = doc(db, 'messages', messageId);
      const messageDoc = await getDoc(messageRef);

      if (!messageDoc.exists()) {
        throw new Error('Съобщението не е намерено');
      }

      const message = messageDoc.data() as BulgarianMessage;

      // Only recipient can archive
      if (message.recipientId !== userId) {
        throw new Error('Нямате права да архивирате това съобщение');
      }

      await updateDoc(messageRef, {
        isArchived: true,
        updatedAt: Timestamp.fromDate(new Date())
      });
    } catch (error: any) {
      throw this.handleMessagingError(error);
    }
  }

  // Delete message
  async deleteMessage(messageId: string, userId: string): Promise<void> {
    try {
      const messageRef = doc(db, 'messages', messageId);
      const messageDoc = await getDoc(messageRef);

      if (!messageDoc.exists()) {
        throw new Error('Съобщението не е намерено');
      }

      const message = messageDoc.data() as BulgarianMessage;

      // Only sender or recipient can delete
      if (message.senderId !== userId && message.recipientId !== userId) {
        throw new Error('Нямате права да изтриете това съобщение');
      }

      await deleteDoc(messageRef);
    } catch (error: any) {
      throw this.handleMessagingError(error);
    }
  }

  // Get unread message count
  async getUnreadMessageCount(userId: string): Promise<number> {
    try {
      const q = query(
        collection(db, 'messages'),
        where('recipientId', '==', userId),
        where('isRead', '==', false),
        where('isArchived', '==', false)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error: any) {
      throw this.handleMessagingError(error);
    }
  }

  // Listen to new messages
  listenToNewMessages(userId: string, callback: (message: BulgarianMessage) => void): Unsubscribe {
    const q = query(
      collection(db, 'messages'),
      where('recipientId', '==', userId),
      where('isArchived', '==', false),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          const message: BulgarianMessage = {
            id: change.doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate()
          } as BulgarianMessage;

          callback(message);
        }
      });
    });

    this.listeners.set(`messages_${userId}`, unsubscribe);
    return unsubscribe;
  }

  // Stop listening to messages
  stopListening(userId: string): void {
    const listenerKey = `messages_${userId}`;
    const unsubscribe = this.listeners.get(listenerKey);
    if (unsubscribe) {
      unsubscribe();
      this.listeners.delete(listenerKey);
    }
  }

  // Private helper methods
  private async updateChatRoom(
    carId: string,
    senderId: string,
    recipientId: string,
    message: Omit<BulgarianMessage, 'id'>,
    messageId: string
  ): Promise<void> {
    try {
      const chatRoomId = this.generateChatRoomId(carId, senderId, recipientId);
      const chatRoomRef = doc(db, 'chatRooms', chatRoomId);

      const chatRoomDoc = await getDoc(chatRoomRef);

      if (chatRoomDoc.exists()) {
        // Update existing chat room
        const updateData: any = {
          lastMessage: { ...message, id: messageId },
          updatedAt: Timestamp.fromDate(new Date())
        };
        updateData[`unreadCount.${recipientId}`] = (chatRoomDoc.data()?.unreadCount?.[recipientId] || 0) + 1;

        await updateDoc(chatRoomRef, updateData);
      } else {
        // Create new chat room
        const chatRoom: Omit<ChatRoom, 'id'> = {
          carId,
          participants: [senderId, recipientId],
          participantNames: [message.senderName, message.recipientName],
          lastMessage: { ...message, id: messageId },
          unreadCount: { [recipientId]: 1 },
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await addDoc(collection(db, 'chatRooms'), {
          ...chatRoom,
          createdAt: Timestamp.fromDate(chatRoom.createdAt),
          updatedAt: Timestamp.fromDate(chatRoom.updatedAt)
        });
      }
    } catch (error) {
      console.error('Error updating chat room:', error);
    }
  }

  private async updateChatRoomUnreadCount(carId: string, senderId: string, recipientId: string): Promise<void> {
    try {
      const chatRoomId = this.generateChatRoomId(carId, senderId, recipientId);
      const chatRoomRef = doc(db, 'chatRooms', chatRoomId);

      const chatRoomDoc = await getDoc(chatRoomRef);
      if (chatRoomDoc.exists()) {
        const currentUnreadCount = chatRoomDoc.data()?.unreadCount?.[recipientId] || 0;
        const updateData: any = {
          updatedAt: Timestamp.fromDate(new Date())
        };
        updateData[`unreadCount.${recipientId}`] = Math.max(0, currentUnreadCount - 1);

        await updateDoc(chatRoomRef, updateData);
      }
    } catch (error) {
      console.error('Error updating unread count:', error);
    }
  }

  private async sendMessageNotification(recipientId: string, message: Omit<BulgarianMessage, 'id'>): Promise<void> {
    // This would integrate with Firebase Cloud Messaging for push notifications
    // For now, we'll just log it
    console.log(`Notification sent to ${recipientId}: New message from ${message.senderName}`);
  }

  private generateChatRoomId(carId: string, userId1: string, userId2: string): string {
    const sortedIds = [userId1, userId2].sort();
    return `${carId}_${sortedIds[0]}_${sortedIds[1]}`;
  }

  private validateMessageContent(content: string): boolean {
    return content.length > 0 && content.length <= 2000;
  }

  private handleMessagingError(error: any): Error {
    const errorMessages: { [key: string]: string } = {
      'permission-denied': 'Нямате права за достъп до това съобщение',
      'not-found': 'Съобщението не е намерено',
      'invalid-argument': 'Невалидни данни за съобщението',
      'resource-exhausted': 'Твърде много заявки. Моля опитайте по-късно',
      'internal': 'Вътрешна грешка в системата'
    };

    const bulgarianMessage = errorMessages[error.code] || 'Възникна грешка при обработката на съобщението';
    return new Error(bulgarianMessage);
  }

  // Cleanup listeners on service destruction
  destroy(): void {
    this.listeners.forEach((unsubscribe) => unsubscribe());
    this.listeners.clear();
  }
}

// Export singleton instance
export const bulgarianMessagingService = BulgarianMessagingService.getInstance();