// src/services/realtimeMessaging.ts
// Real-time Messaging Service for Bulgarian Car Marketplace

import {
  collection,
  doc,
  addDoc,
  updateDoc,
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
import { db } from '../firebase/firebase-config';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  carId?: string;
  carTitle?: string;
  content: string;
  messageType: 'text' | 'image' | 'offer' | 'question';
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  participantNames: { [userId: string]: string };
  lastMessage?: Message;
  unreadCount: { [userId: string]: number };
  carId?: string;
  carTitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
  timestamp: Date;
}

export class RealtimeMessagingService {
  private static instance: RealtimeMessagingService;
  private messageListeners: Map<string, Unsubscribe> = new Map();
  private chatRoomListeners: Map<string, Unsubscribe> = new Map();
  private typingListeners: Map<string, Unsubscribe> = new Map();

  private constructor() {}

  static getInstance(): RealtimeMessagingService {
    if (!RealtimeMessagingService.instance) {
      RealtimeMessagingService.instance = new RealtimeMessagingService();
    }
    return RealtimeMessagingService.instance;
  }

  // Send a message
  async sendMessage(messageData: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      // Create message object
      const message: Omit<Message, 'id'> = {
        ...messageData,
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
      await this.updateChatRoom(messageData.senderId, messageData.receiverId, message);

      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  // Get messages for a chat room
  async getMessages(senderId: string, receiverId: string, limitCount: number = 50): Promise<Message[]> {
    try {
      const q = query(
        collection(db, 'messages'),
        where('senderId', 'in', [senderId, receiverId]),
        where('receiverId', 'in', [senderId, receiverId]),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const messages: Message[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Message);
      });

      // Reverse to get chronological order
      return messages.reverse();
    } catch (error: any) {
      throw new Error(`Failed to get messages: ${error.message}`);
    }
  }

  // Mark messages as read
  async markMessagesAsRead(senderId: string, receiverId: string): Promise<void> {
    try {
      const q = query(
        collection(db, 'messages'),
        where('senderId', '==', senderId),
        where('receiverId', '==', receiverId),
        where('isRead', '==', false)
      );

      const querySnapshot = await getDocs(q);

      const updatePromises = querySnapshot.docs.map(doc =>
        updateDoc(doc.ref, {
          isRead: true,
          updatedAt: Timestamp.fromDate(new Date())
        })
      );

      await Promise.all(updatePromises);

      // Update unread count in chat room
      await this.updateUnreadCount(senderId, receiverId, 0);
    } catch (error: any) {
      throw new Error(`Failed to mark messages as read: ${error.message}`);
    }
  }

  // Listen to new messages in real-time
  listenToMessages(
    userId: string,
    callback: (messages: Message[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, 'messages'),
      where('receiverId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Message);
      });

      // Reverse to get chronological order
      callback(messages.reverse());
    });

    this.messageListeners.set(userId, unsubscribe);
    return unsubscribe;
  }

  // Get user's chat rooms
  async getUserChatRooms(userId: string): Promise<ChatRoom[]> {
    try {
      const q = query(
        collection(db, 'chatRooms'),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const chatRooms: ChatRoom[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        chatRooms.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          lastMessage: data.lastMessage ? {
            ...data.lastMessage,
            createdAt: data.lastMessage.createdAt.toDate(),
            updatedAt: data.lastMessage.updatedAt.toDate()
          } : undefined
        } as ChatRoom);
      });

      return chatRooms;
    } catch (error: any) {
      throw new Error(`Failed to get chat rooms: ${error.message}`);
    }
  }

  // Listen to chat rooms in real-time
  listenToChatRooms(
    userId: string,
    callback: (chatRooms: ChatRoom[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, 'chatRooms'),
      where('participants', 'array-contains', userId),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatRooms: ChatRoom[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        chatRooms.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          lastMessage: data.lastMessage ? {
            ...data.lastMessage,
            createdAt: data.lastMessage.createdAt.toDate(),
            updatedAt: data.lastMessage.updatedAt.toDate()
          } : undefined
        } as ChatRoom);
      });

      callback(chatRooms);
    });

    this.chatRoomListeners.set(userId, unsubscribe);
    return unsubscribe;
  }

  // Send typing indicator
  async sendTypingIndicator(
    senderId: string,
    receiverId: string,
    isTyping: boolean
  ): Promise<void> {
    try {
      const typingData = {
        userId: senderId,
        isTyping,
        timestamp: Timestamp.fromDate(new Date())
      };

      // Update typing status in a temporary collection
      await addDoc(collection(db, 'typing'), {
        ...typingData,
        receiverId
      });
    } catch (error: any) {
      console.error('Failed to send typing indicator:', error);
    }
  }

  // Listen to typing indicators
  listenToTypingIndicators(
    userId: string,
    callback: (indicators: TypingIndicator[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, 'typing'),
      where('receiverId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const indicators: TypingIndicator[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        indicators.push({
          userId: data.userId,
          userName: data.userName || 'Unknown User',
          isTyping: data.isTyping,
          timestamp: data.timestamp.toDate()
        });
      });

      callback(indicators);
    });

    this.typingListeners.set(userId, unsubscribe);
    return unsubscribe;
  }

  // Private methods
  private async updateChatRoom(
    senderId: string,
    receiverId: string,
    lastMessage: Omit<Message, 'id'>
  ): Promise<void> {
    try {
      const chatRoomId = this.generateChatRoomId(senderId, receiverId);

      const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
      const chatRoomDoc = await getDoc(chatRoomRef);

      if (chatRoomDoc.exists()) {
        // Update existing chat room
        await updateDoc(chatRoomRef, {
          lastMessage: {
            ...lastMessage,
            createdAt: Timestamp.fromDate(lastMessage.createdAt),
            updatedAt: Timestamp.fromDate(lastMessage.updatedAt)
          },
          updatedAt: Timestamp.fromDate(new Date())
        });
      } else {
        // Create new chat room
        await addDoc(collection(db, 'chatRooms'), {
          id: chatRoomId,
          participants: [senderId, receiverId],
          participantNames: {
            [senderId]: lastMessage.senderName,
            [receiverId]: lastMessage.receiverName
          },
          lastMessage: {
            ...lastMessage,
            createdAt: Timestamp.fromDate(lastMessage.createdAt),
            updatedAt: Timestamp.fromDate(lastMessage.updatedAt)
          },
          unreadCount: {
            [senderId]: 0,
            [receiverId]: 1
          },
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date())
        });
      }
    } catch (error: any) {
      console.error('Failed to update chat room:', error);
    }
  }

  private async updateUnreadCount(
    senderId: string,
    receiverId: string,
    count: number
  ): Promise<void> {
    try {
      const chatRoomId = this.generateChatRoomId(senderId, receiverId);
      const chatRoomRef = doc(db, 'chatRooms', chatRoomId);

      await updateDoc(chatRoomRef, {
        [`unreadCount.${receiverId}`]: count,
        updatedAt: Timestamp.fromDate(new Date())
      });
    } catch (error: any) {
      console.error('Failed to update unread count:', error);
    }
  }

  private generateChatRoomId(userId1: string, userId2: string): string {
    // Create consistent chat room ID regardless of order
    const sortedIds = [userId1, userId2].sort();
    return `${sortedIds[0]}_${sortedIds[1]}`;
  }

  // Cleanup listeners
  cleanup(userId: string): void {
    const messageUnsubscribe = this.messageListeners.get(userId);
    if (messageUnsubscribe) {
      messageUnsubscribe();
      this.messageListeners.delete(userId);
    }

    const chatRoomUnsubscribe = this.chatRoomListeners.get(userId);
    if (chatRoomUnsubscribe) {
      chatRoomUnsubscribe();
      this.chatRoomListeners.delete(userId);
    }

    const typingUnsubscribe = this.typingListeners.get(userId);
    if (typingUnsubscribe) {
      typingUnsubscribe();
      this.typingListeners.delete(userId);
    }
  }
}

// Export singleton instance
export const realtimeMessagingService = RealtimeMessagingService.getInstance();