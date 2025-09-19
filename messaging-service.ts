// src/services/messaging-service.ts
// Enhanced Messaging Service for Bulgarian Car Marketplace

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  Query,
  Unsubscribe
} from 'firebase/firestore';
import { db, BulgarianFirebaseUtils } from './firebase-config';
import { bulgarianAuth, BulgarianUser } from './auth-service';

// Message types and interfaces
export interface CarMessage {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  userPhoto: string | undefined;
  text: string;
  timestamp: Date;
  language: 'bg' | 'en';
  type: 'comment' | 'question' | 'offer' | 'review' | 'complaint';
  rating: number | undefined; // For reviews (1-5)
  price: number | undefined; // For offers
  isSeller: boolean;
  isModerated: boolean;
  replies: CarMessage[] | undefined;
  parentId: string | undefined; // For replies
  likes: number;
  likedBy: string[];
  isEdited: boolean;
  editedAt: Date | undefined;
  attachments: MessageAttachment[] | undefined;
  metadata: {
    userAgent: string | undefined;
    ipAddress: string | undefined;
    source: 'web' | 'mobile' | 'api';
  };
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'document' | 'video';
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  participantNames: { [userId: string]: string };
  carId: string;
  carTitle: string;
  lastMessage?: Partial<CarMessage>;
  unreadCount: { [userId: string]: number };
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isBlocked: boolean;
  blockedBy?: string;
  messageCount: number;
  tags: string[];
}

export interface MessageNotification {
  id: string;
  userId: string;
  type: 'new_message' | 'new_offer' | 'message_reply' | 'car_inquiry';
  title: string;
  body: string;
  data: {
    carId?: string;
    messageId?: string;
    chatRoomId?: string;
    fromUserId?: string;
  };
  isRead: boolean;
  createdAt: Date;
}

// Message filters and search options
export interface MessageFilters {
  type?: CarMessage['type'];
  userId?: string;
  language?: 'bg' | 'en';
  dateFrom?: Date;
  dateTo?: Date;
  hasRating?: boolean;
  minRating?: number;
  maxRating?: number;
  searchText?: string;
}

export interface MessageStats {
  totalMessages: number;
  messagesByType: { [key in CarMessage['type']]: number };
  averageRating: number;
  totalOffers: number;
  averageOfferPrice: number;
  responseRate: number;
  averageResponseTime: number; // in minutes
}

export class BulgarianMessagingService {
  private messageListeners: { [carId: string]: Unsubscribe } = {};
  private chatListeners: { [chatId: string]: Unsubscribe } = {};
  private notificationListeners: { [userId: string]: Unsubscribe } = {};

  // Send a message/comment about a car
  public async sendCarMessage(
    carId: string,
    text: string,
    type: CarMessage['type'] = 'comment',
    options?: {
      rating?: number;
      price?: number;
      parentId?: string;
      attachments?: MessageAttachment[];
    }
  ): Promise<string> {
    const currentUser = bulgarianAuth.getCurrentUser();
    if (!currentUser) {
      throw new Error('Трябва да сте влезли в системата');
    }

    try {
      // Validate input
      this.validateMessageInput(text, type, options);

      const messageData: Omit<CarMessage, 'id'> = {
        carId,
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userPhoto: currentUser.photoURL || undefined,
        text: BulgarianFirebaseUtils.sanitizeBulgarianText(text),
        timestamp: new Date(),
        language: currentUser.preferredLanguage,
        type,
        rating: options?.rating,
        price: options?.price,
        isSeller: currentUser.role === 'seller',
        isModerated: false,
        replies: [],
        parentId: options?.parentId,
        likes: 0,
        likedBy: [],
        isEdited: false,
        editedAt: undefined,
        attachments: options?.attachments || [],
        metadata: {
          source: 'web',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          ipAddress: 'unknown'
        }
      };

      const docRef = await addDoc(collection(db, 'carMessages'), {
        ...messageData,
        timestamp: serverTimestamp()
      });

      // Update car's last activity and message count
      await this.updateCarActivity(carId, type);

      // Update user statistics
      await this.updateUserMessageStats(currentUser.uid);

      // Send notification to car owner if this is a question or offer
      if (type === 'question' || type === 'offer') {
        await this.sendMessageNotification(carId, currentUser, type, text);
      }

      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Грешка при изпращане на съобщението');
    }
  }

  // Listen to messages for a specific car
  public listenToCarMessages(
    carId: string,
    callback: (messages: CarMessage[]) => void,
    filters?: MessageFilters
  ): Unsubscribe {
    let q: Query = collection(db, 'carMessages');

    // Apply filters
    q = query(q, where('carId', '==', carId));

    if (filters?.type) {
      q = query(q, where('type', '==', filters.type));
    }

    if (filters?.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }

    if (filters?.language) {
      q = query(q, where('language', '==', filters.language));
    }

    q = query(q, orderBy('timestamp', 'desc'), limit(100));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: CarMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
          editedAt: data.editedAt?.toDate()
        } as CarMessage);
      });

      // Organize messages with replies
      const organizedMessages = this.organizeMessagesWithReplies(messages, filters);
      callback(organizedMessages);
    });

    this.messageListeners[carId] = unsubscribe;
    return unsubscribe;
  }

  // Stop listening to car messages
  public stopListeningToCarMessages(carId: string): void {
    if (this.messageListeners[carId]) {
      this.messageListeners[carId]();
      delete this.messageListeners[carId];
    }
  }

  // Create or get existing chat room between users
  public async createOrGetChatRoom(carId: string, sellerId: string): Promise<string> {
    const currentUser = bulgarianAuth.getCurrentUser();
    if (!currentUser) {
      throw new Error('Тряبва да сте влезли в системата');
    }

    if (currentUser.uid === sellerId) {
      throw new Error('Не можете да създадете чат със себе си');
    }

    const participants = [currentUser.uid, sellerId].sort();
    const chatRoomId = `chat_${participants.join('_')}_${carId}`;

    try {
      // Check if chat room already exists
      const existingChat = await this.getChatRoom(chatRoomId);
      if (existingChat) {
        return chatRoomId;
      }

      // Get car information
      const carDoc = await getDoc(doc(db, 'cars', carId));
      const carTitle = carDoc.exists() ? carDoc.data()?.title || 'Неизвестна кола' : 'Неизвестна кола';

      // Get participant names
      const participantNames: { [userId: string]: string } = {};
      for (const participantId of participants) {
        const userDoc = await getDoc(doc(db, 'users', participantId));
        participantNames[participantId] = userDoc.exists() ?
          userDoc.data()?.displayName || 'Неизвестен потребител' :
          'Неизвестен потребител';
      }

      // Create new chat room
      const chatRoomData: Omit<ChatRoom, 'id'> = {
        participants,
        participantNames,
        carId,
        carTitle,
        unreadCount: {
          [currentUser.uid]: 0,
          [sellerId]: 0
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isBlocked: false,
        messageCount: 0,
        tags: []
      };

      await addDoc(collection(db, 'chatRooms'), {
        ...chatRoomData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return chatRoomId;
    } catch (error) {
      console.error('Error creating chat room:', error);
      throw new Error('Грешка при създаване на чат стая');
    }
  }

  // Send message in chat room
  public async sendChatMessage(chatRoomId: string, text: string, attachments?: MessageAttachment[]): Promise<string> {
    const currentUser = bulgarianAuth.getCurrentUser();
    if (!currentUser) {
      throw new Error('Трябва да сте влезли в системата');
    }

    try {
      // Validate chat room access
      await this.validateChatRoomAccess(chatRoomId, currentUser.uid);

      const messageData: Omit<CarMessage, 'id' | 'carId'> = {
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userPhoto: currentUser.photoURL || undefined,
        text: BulgarianFirebaseUtils.sanitizeBulgarianText(text),
        timestamp: new Date(),
        language: currentUser.preferredLanguage,
        type: 'comment',
        rating: undefined,
        price: undefined,
        isSeller: currentUser.role === 'seller',
        isModerated: false,
        replies: [],
        parentId: undefined,
        likes: 0,
        likedBy: [],
        isEdited: false,
        editedAt: undefined,
        attachments: attachments || [],
        metadata: {
          source: 'web',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          ipAddress: 'unknown'
        }
      };

      const docRef = await addDoc(collection(db, 'chatMessages'), {
        ...messageData,
        chatRoomId,
        timestamp: serverTimestamp()
      });

      // Update chat room's last message and unread counts
      await this.updateChatRoomLastMessage(chatRoomId, messageData);

      return docRef.id;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error('Грешка при изпращане на съобщението');
    }
  }

  // Listen to chat messages
  public listenToChatMessages(
    chatRoomId: string,
    callback: (messages: CarMessage[]) => void
  ): Unsubscribe {
    const q = query(
      collection(db, 'chatMessages'),
      where('chatRoomId', '==', chatRoomId),
      orderBy('timestamp', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: CarMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          carId: '', // Chat messages don't have carId
          ...data,
          timestamp: data.timestamp?.toDate() || new Date()
        } as CarMessage);
      });

      callback(messages);
    });

    this.chatListeners[chatRoomId] = unsubscribe;
    return unsubscribe;
  }

  // Stop listening to chat messages
  public stopListeningToChatMessages(chatRoomId: string): void {
    if (this.chatListeners[chatRoomId]) {
      this.chatListeners[chatRoomId]();
      delete this.chatListeners[chatRoomId];
    }
  }

  // Like/unlike a message
  public async toggleMessageLike(messageId: string): Promise<void> {
    const currentUser = bulgarianAuth.getCurrentUser();
    if (!currentUser) {
      throw new Error('Трябва да сте влезли в системата');
    }

    try {
      const messageRef = doc(db, 'carMessages', messageId);
      const messageDoc = await getDoc(messageRef);

      if (!messageDoc.exists()) {
        throw new Error('Съобщението не е намерено');
      }

      const messageData = messageDoc.data() as CarMessage;
      const isLiked = messageData.likedBy?.includes(currentUser.uid);

      if (isLiked) {
        // Unlike
        await updateDoc(messageRef, {
          likes: increment(-1),
          likedBy: arrayRemove(currentUser.uid)
        });
      } else {
        // Like
        await updateDoc(messageRef, {
          likes: increment(1),
          likedBy: arrayUnion(currentUser.uid)
        });
      }
    } catch (error) {
      console.error('Error toggling message like:', error);
      throw new Error('Грешка при харесване на съобщението');
    }
  }

  // Edit a message
  public async editMessage(messageId: string, newText: string): Promise<void> {
    const currentUser = bulgarianAuth.getCurrentUser();
    if (!currentUser) {
      throw new Error('Трябва да сте влезли в системата');
    }

    try {
      const messageRef = doc(db, 'carMessages', messageId);
      const messageDoc = await getDoc(messageRef);

      if (!messageDoc.exists()) {
        throw new Error('Съобщението не е намерено');
      }

      const messageData = messageDoc.data() as CarMessage;

      // Check if user owns the message
      if (messageData.userId !== currentUser.uid) {
        throw new Error('Нямате права да редактирате това съобщение');
      }

      await updateDoc(messageRef, {
        text: BulgarianFirebaseUtils.sanitizeBulgarianText(newText),
        isEdited: true,
        editedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error editing message:', error);
      throw new Error('Грешка при редактиране на съобщението');
    }
  }

  // Delete a message
  public async deleteMessage(messageId: string): Promise<void> {
    const currentUser = bulgarianAuth.getCurrentUser();
    if (!currentUser) {
      throw new Error('Тряبва да сте влезли в системата');
    }

    try {
      const messageRef = doc(db, 'carMessages', messageId);
      const messageDoc = await getDoc(messageRef);

      if (!messageDoc.exists()) {
        throw new Error('Съобщението не е намерено');
      }

      const messageData = messageDoc.data() as CarMessage;

      // Check if user owns the message or is admin
      if (messageData.userId !== currentUser.uid && currentUser.role !== 'admin') {
        throw new Error('Нямате права да изтриете това съобщение');
      }

      await deleteDoc(messageRef);
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Грешка при изтриване на съобщението');
    }
  }

  // Get message statistics for a car
  public async getCarMessageStats(carId: string): Promise<MessageStats> {
    try {
      const q = query(collection(db, 'carMessages'), where('carId', '==', carId));
      const snapshot = await getDocs(q);

      const stats: MessageStats = {
        totalMessages: snapshot.size,
        messagesByType: {
          comment: 0,
          question: 0,
          offer: 0,
          review: 0,
          complaint: 0
        },
        averageRating: 0,
        totalOffers: 0,
        averageOfferPrice: 0,
        responseRate: 0,
        averageResponseTime: 0
      };

      let totalRating = 0;
      let ratingCount = 0;
      let totalOfferPrice = 0;
      let offerCount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data() as CarMessage;

        // Count by type
        stats.messagesByType[data.type]++;

        // Calculate ratings
        if (data.rating && data.rating > 0) {
          totalRating += data.rating;
          ratingCount++;
        }

        // Calculate offers
        if (data.type === 'offer' && data.price && data.price > 0) {
          totalOfferPrice += data.price;
          offerCount++;
        }
      });

      // Calculate averages
      stats.averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;
      stats.totalOffers = offerCount;
      stats.averageOfferPrice = offerCount > 0 ? totalOfferPrice / offerCount : 0;

      return stats;
    } catch (error) {
      console.error('Error getting message stats:', error);
      throw new Error('Грешка при зареждане на статистиките');
    }
  }

  // Private helper methods
  private async getChatRoom(chatRoomId: string): Promise<ChatRoom | null> {
    try {
      const chatDoc = await getDoc(doc(db, 'chatRooms', chatRoomId));
      if (chatDoc.exists()) {
        const data = chatDoc.data();
        return {
          id: chatDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as ChatRoom;
      }
      return null;
    } catch (error) {
      console.error('Error getting chat room:', error);
      return null;
    }
  }

  private organizeMessagesWithReplies(messages: CarMessage[], filters?: MessageFilters): CarMessage[] {
    const messageMap = new Map<string, CarMessage>();
    const topLevelMessages: CarMessage[] = [];

    // First pass: create map and identify top-level messages
    messages.forEach(message => {
      messageMap.set(message.id, { ...message, replies: [] });
      if (!message.parentId) {
        topLevelMessages.push(message);
      }
    });

    // Second pass: organize replies
    messages.forEach(message => {
      if (message.parentId && messageMap.has(message.parentId)) {
        const parent = messageMap.get(message.parentId)!;
        parent.replies = parent.replies || [];
        parent.replies.push(messageMap.get(message.id)!);
      }
    });

    // Apply additional filters if needed
    let filteredMessages = topLevelMessages;

    if (filters?.searchText) {
      const searchTerm = filters.searchText.toLowerCase();
      filteredMessages = filteredMessages.filter(message =>
        message.text.toLowerCase().includes(searchTerm) ||
        message.userName.toLowerCase().includes(searchTerm)
      );
    }

    return filteredMessages.map(message => messageMap.get(message.id) || message);
  }

  private validateMessageInput(
    text: string,
    type: CarMessage['type'],
    options?: { rating?: number; price?: number }
  ): void {
    if (!text || text.trim().length === 0) {
      throw new Error('Съобщението не може да бъде празно');
    }

    if (text.length > 1000) {
      throw new Error('Съобщението е твърде дълго (максимум 1000 символа)');
    }

    if (type === 'review' && (!options?.rating || options.rating < 1 || options.rating > 5)) {
      throw new Error('Оценката трябва да бъде между 1 и 5');
    }

    if (type === 'offer' && (!options?.price || options.price <= 0)) {
      throw new Error('Цената на офертата трябва да бъде положителна');
    }
  }

  private async validateChatRoomAccess(chatRoomId: string, userId: string): Promise<void> {
    const chatRoom = await this.getChatRoom(chatRoomId);
    if (!chatRoom) {
      throw new Error('Чат стаята не е намерена');
    }

    if (!chatRoom.participants.includes(userId)) {
      throw new Error('Нямате достъп до тази чат стая');
    }

    if (chatRoom.isBlocked) {
      throw new Error('Чат стаята е блокирана');
    }
  }

  private async updateCarActivity(carId: string, messageType: CarMessage['type']): Promise<void> {
    try {
      const carRef = doc(db, 'cars', carId);
      await updateDoc(carRef, {
        lastActivity: serverTimestamp(),
        [`messageCount.${messageType}`]: increment(1)
      });
    } catch (error) {
      console.error('Error updating car activity:', error);
    }
  }

  private async updateUserMessageStats(userId: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'statistics.messagesExchanged': increment(1),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user message stats:', error);
    }
  }

  private async updateChatRoomLastMessage(chatRoomId: string, messageData: Partial<CarMessage>): Promise<void> {
    try {
      const chatRef = doc(db, 'chatRooms', chatRoomId);
      const chatRoom = await this.getChatRoom(chatRoomId);

      if (!chatRoom) return;

      // Increment unread count for other participants
      const unreadUpdates: { [key: string]: any } = {};
      chatRoom.participants.forEach(participantId => {
        if (participantId !== messageData.userId) {
          unreadUpdates[`unreadCount.${participantId}`] = increment(1);
        }
      });

      await updateDoc(chatRef, {
        lastMessage: {
          text: messageData.text,
          timestamp: messageData.timestamp,
          userName: messageData.userName,
          userId: messageData.userId
        },
        messageCount: increment(1),
        updatedAt: serverTimestamp(),
        ...unreadUpdates
      });
    } catch (error) {
      console.error('Error updating chat room last message:', error);
    }
  }

  private async sendMessageNotification(
    carId: string,
    sender: BulgarianUser,
    type: CarMessage['type'],
    text: string
  ): Promise<void> {
    try {
      // Get car owner information
      const carDoc = await getDoc(doc(db, 'cars', carId));
      if (!carDoc.exists()) return;

      const carData = carDoc.data();
      const carOwnerId = carData.sellerId;

      if (carOwnerId === sender.uid) return; // Don't notify self

      // Create notification
      const notification: Omit<MessageNotification, 'id'> = {
        userId: carOwnerId,
        type: type === 'question' ? 'car_inquiry' : 'new_offer',
        title: type === 'question' ? 'Нов въпрос за вашата кола' : 'Нова оферта за вашата кола',
        body: `${sender.displayName}: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`,
        data: {
          carId,
          fromUserId: sender.uid
        },
        isRead: false,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'notifications'), {
        ...notification,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  // Cleanup method to stop all listeners
  public cleanup(): void {
    Object.values(this.messageListeners).forEach(unsubscribe => unsubscribe());
    Object.values(this.chatListeners).forEach(unsubscribe => unsubscribe());
    Object.values(this.notificationListeners).forEach(unsubscribe => unsubscribe());

    this.messageListeners = {};
    this.chatListeners = {};
    this.notificationListeners = {};
  }
}

// Create singleton instance
export const bulgarianMessaging = new BulgarianMessagingService();

// Export for convenience
export default bulgarianMessaging;