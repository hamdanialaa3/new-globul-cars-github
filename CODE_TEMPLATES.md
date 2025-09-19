# 📝 قوالب الكود الجاهزة - مشروع Globul Cars

## 🎯 قالب firebase-config.ts (الأولوية القصوى)

```typescript
// src/services/firebase-config.ts
// Enhanced Firebase Configuration for Bulgarian Car Marketplace
// تكوين Firebase محسن لسوق السيارات البلغاري

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, Functions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Firebase configuration for Bulgarian Car Marketplace
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "globul-cars.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "globul-cars",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "globul-cars.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ABCDEFGHIJ"
};

// Bulgarian localization settings
export const BULGARIAN_CONFIG = {
  locale: 'bg-BG',
  currency: 'EUR',
  timezone: 'Europe/Sofia',
  region: 'Bulgaria',
  phonePrefix: '+359',
  defaultLanguage: 'bg' as const,
  supportedLanguages: ['bg', 'en'] as const
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const functions: Functions = getFunctions(app);

// Analytics (only in production and browser)
let analytics: Analytics | undefined;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

export { analytics };

// Development environment setup with emulators
if (process.env.NODE_ENV === 'development' && process.env.VITE_USE_EMULATORS === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
    console.log('🔥 Connected to Firebase emulators');
  } catch (error) {
    console.log('Firebase emulators not running:', error);
  }
}

// Bulgarian-specific Firebase utilities
export class BulgarianFirebaseUtils {
  // Convert Firebase timestamp to Bulgarian format
  static formatTimestamp(timestamp: any): string {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: BULGARIAN_CONFIG.timezone
    }).format(date);
  }

  // Format currency in Bulgarian format (EUR)
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: BULGARIAN_CONFIG.currency
    }).format(amount);
  }

  // Validate Bulgarian phone number
  static isValidBulgarianPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\s+/g, '');
    const bulgarianPhoneRegex = /^(\+359|0)[8-9][0-9]{7,8}$/;
    return bulgarianPhoneRegex.test(cleanPhone);
  }

  // Generate Bulgarian-friendly ID
  static generateBulgarianId(prefix: string = 'BG'): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }

  // Format Bulgarian address
  static formatBulgarianAddress(address: {
    street?: string;
    city: string;
    region?: string;
    postalCode?: string;
  }): string {
    const parts = [];
    if (address.street) parts.push(address.street);
    parts.push(address.city);
    if (address.region && address.region !== address.city) {
      parts.push(address.region);
    }
    parts.push('България'); // Bulgaria in Bulgarian
    if (address.postalCode) parts.push(address.postalCode);
    return parts.join(', ');
  }

  // Sanitize Bulgarian text input
  static sanitizeBulgarianText(text: string): string {
    return text
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .substring(0, 1000); // Limit length
  }

  // Check if text contains Bulgarian characters
  static containsBulgarianText(text: string): boolean {
    const bulgarianRegex = /[\u0400-\u04FF]/;
    return bulgarianRegex.test(text);
  }

  // Get Bulgarian month names
  static getBulgarianMonthName(monthIndex: number): string {
    const months = [
      'януари', 'февруари', 'март', 'април', 'май', 'юни',
      'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'
    ];
    return months[monthIndex] || '';
  }

  // Convert kilometers to miles (for international users)
  static kmToMiles(km: number): number {
    return Math.round(km * 0.621371);
  }

  // Convert miles to kilometers
  static milesToKm(miles: number): number {
    return Math.round(miles * 1.60934);
  }

  // Format mileage for display
  static formatMileage(mileage: number, unit: 'km' | 'miles' = 'km'): string {
    return `${mileage.toLocaleString('bg-BG')} ${unit}`;
  }
}

// Export default app for compatibility
export default app;

// Type definitions for better TypeScript support
export type BulgarianLanguage = typeof BULGARIAN_CONFIG.supportedLanguages[number];
export type BulgarianCurrency = typeof BULGARIAN_CONFIG.currency;

// Firebase app information for debugging
console.log(`🇧🇬 Bulgarian Firebase initialized: ${app.name}`);
console.log(`💰 Currency: ${BULGARIAN_CONFIG.currency}`);
console.log(`📍 Region: ${BULGARIAN_CONFIG.region}`);
console.log(`🌍 Locale: ${BULGARIAN_CONFIG.locale}`);
```

---

## 🔐 قالب auth-service.ts (الأولوية الثانية)

```typescript
// src/services/auth-service.ts
// Enhanced Authentication Service for Bulgarian Car Marketplace
// خدمة المصادقة المحسنة لسوق السيارات البلغاري

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  deleteUser,
  User,
  UserCredential
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  DocumentSnapshot
} from 'firebase/firestore';
import { auth, db, BULGARIAN_CONFIG, BulgarianFirebaseUtils } from './firebase-config';

// Bulgarian User interface with all required fields
export interface BulgarianUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  location: string;
  preferredLanguage: 'bg' | 'en';
  currency: string;
  timezone: string;
  role: 'buyer' | 'seller' | 'admin' | 'moderator';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  profile: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    address?: {
      street?: string;
      city: string;
      region?: string;
      postalCode?: string;
    };
    website?: string;
    bio?: string;
  };
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    privacy: {
      showPhone: boolean;
      showEmail: boolean;
      showOnlineStatus: boolean;
    };
    marketplace: {
      favoriteCarBrands: string[];
      priceRange: {
        min: number;
        max: number;
      };
      searchRadius: number; // in kilometers
    };
  };
  statistics: {
    carsListed: number;
    carsSold: number;
    carsBought: number;
    messagesExchanged: number;
    rating: number;
    reviewsCount: number;
  };
}

// Authentication error types
type AuthError = {
  code: string;
  message: string;
};

// User creation data type
type UserCreationData = Partial<BulgarianUser> & {
  email: string;
  displayName: string;
};

export class BulgarianAuthService {
  private currentUser: BulgarianUser | null = null;
  private authStateListeners: Array<(user: BulgarianUser | null) => void> = [];

  constructor() {
    this.initializeAuthListener();
  }

  // Initialize authentication state listener
  private initializeAuthListener(): void {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          this.currentUser = await this.getBulgarianUserData(user);
          if (this.currentUser) {
            await this.updateLastLogin(user.uid);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          this.currentUser = null;
        }
      } else {
        this.currentUser = null;
      }
      
      // Notify all listeners
      this.authStateListeners.forEach(listener => listener(this.currentUser));
    });
  }

  // Subscribe to auth state changes
  public onAuthStateChanged(callback: (user: BulgarianUser | null) => void): () => void {
    this.authStateListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  // Sign up with email and password
  public async signUp(
    email: string,
    password: string,
    userData: UserCreationData
  ): Promise<BulgarianUser> {
    try {
      // Validate input
      this.validateSignUpData(email, password, userData);

      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: userData.displayName
      });

      // Create Bulgarian user document
      const bulgarianUser: BulgarianUser = this.createBulgarianUserObject(user, userData);
      await setDoc(doc(db, 'users', user.uid), {
        ...bulgarianUser,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });

      this.currentUser = bulgarianUser;
      return bulgarianUser;
    } catch (error: any) {
      throw new Error(this.getBulgarianErrorMessage(error.code));
    }
  }

  // Sign in with email and password
  public async signIn(email: string, password: string): Promise<BulgarianUser> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let bulgarianUser = await this.getBulgarianUserData(user);
      if (!bulgarianUser) {
        bulgarianUser = await this.createBulgarianUserFromFirebaseUser(user);
      }

      this.currentUser = bulgarianUser;
      return bulgarianUser;
    } catch (error: any) {
      throw new Error(this.getBulgarianErrorMessage(error.code));
    }
  }

  // Sign in with Google
  public async signInWithGoogle(): Promise<BulgarianUser> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      provider.addScope('email');
      provider.addScope('profile');

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      let bulgarianUser = await this.getBulgarianUserData(user);
      if (!bulgarianUser) {
        bulgarianUser = await this.createBulgarianUserFromSocial(user, 'google');
      }

      this.currentUser = bulgarianUser;
      return bulgarianUser;
    } catch (error: any) {
      throw new Error(this.getBulgarianErrorMessage(error.code));
    }
  }

  // Sign in with Facebook
  public async signInWithFacebook(): Promise<BulgarianUser> {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      provider.addScope('public_profile');

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      let bulgarianUser = await this.getBulgarianUserData(user);
      if (!bulgarianUser) {
        bulgarianUser = await this.createBulgarianUserFromSocial(user, 'facebook');
      }

      this.currentUser = bulgarianUser;
      return bulgarianUser;
    } catch (error: any) {
      throw new Error(this.getBulgarianErrorMessage(error.code));
    }
  }

  // Sign out
  public async signOut(): Promise<void> {
    try {
      await signOut(auth);
      this.currentUser = null;
    } catch (error) {
      console.error('Sign out error:', error);
      throw new Error('Грешка при излизане от системата');
    }
  }

  // Get current user
  public getCurrentUser(): BulgarianUser | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Check if user has specific role
  public hasRole(role: BulgarianUser['role']): boolean {
    return this.currentUser?.role === role;
  }

  // Update user profile
  public async updateProfile(updates: Partial<BulgarianUser>): Promise<void> {
    if (!this.currentUser) {
      throw new Error('Няма активен потребител');
    }

    try {
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'users', this.currentUser.uid), updateData);
      
      // Update local user object
      this.currentUser = { ...this.currentUser, ...updates };
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Грешка при обновяване на профила');
    }
  }

  // Update user password
  public async updatePassword(newPassword: string): Promise<void> {
    if (!auth.currentUser) {
      throw new Error('Няма активен потребител');
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
    } catch (error: any) {
      throw new Error(this.getBulgarianErrorMessage(error.code));
    }
  }

  // Send password reset email
  public async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(this.getBulgarianErrorMessage(error.code));
    }
  }

  // Delete user account
  public async deleteAccount(): Promise<void> {
    if (!auth.currentUser || !this.currentUser) {
      throw new Error('Няма активен потребител');
    }

    try {
      // Delete user document from Firestore
      await deleteDoc(doc(db, 'users', this.currentUser.uid));
      
      // Delete Firebase Auth user
      await deleteUser(auth.currentUser);
      
      this.currentUser = null;
    } catch (error: any) {
      throw new Error(this.getBulgarianErrorMessage(error.code));
    }
  }

  // Private helper methods
  private async getBulgarianUserData(user: User): Promise<BulgarianUser | null> {
    try {
      const userDoc: DocumentSnapshot = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate() || new Date()
        } as BulgarianUser;
      }
      return null;
    } catch (error) {
      console.error('Error getting Bulgarian user data:', error);
      return null;
    }
  }

  private createBulgarianUserObject(user: User, userData: UserCreationData): BulgarianUser {
    return {
      uid: user.uid,
      email: user.email!,
      displayName: userData.displayName || user.displayName || user.email!.split('@')[0],
      photoURL: user.photoURL || undefined,
      phoneNumber: userData.phoneNumber,
      location: userData.location || BULGARIAN_CONFIG.region,
      preferredLanguage: userData.preferredLanguage || BULGARIAN_CONFIG.defaultLanguage,
      currency: BULGARIAN_CONFIG.currency,
      timezone: BULGARIAN_CONFIG.timezone,
      role: userData.role || 'buyer',
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
      profile: {
        firstName: userData.profile?.firstName,
        lastName: userData.profile?.lastName,
        dateOfBirth: userData.profile?.dateOfBirth,
        gender: userData.profile?.gender,
        address: userData.profile?.address || {
          city: BULGARIAN_CONFIG.region
        },
        website: userData.profile?.website,
        bio: userData.profile?.bio
      },
      preferences: {
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        privacy: {
          showPhone: false,
          showEmail: false,
          showOnlineStatus: true
        },
        marketplace: {
          favoriteCarBrands: [],
          priceRange: {
            min: 1000,
            max: 100000
          },
          searchRadius: 50
        }
      },
      statistics: {
        carsListed: 0,
        carsSold: 0,
        carsBought: 0,
        messagesExchanged: 0,
        rating: 0,
        reviewsCount: 0
      }
    };
  }

  private async createBulgarianUserFromFirebaseUser(user: User): Promise<BulgarianUser> {
    const bulgarianUser = this.createBulgarianUserObject(user, {
      email: user.email!,
      displayName: user.displayName || user.email!.split('@')[0]
    });

    await setDoc(doc(db, 'users', user.uid), {
      ...bulgarianUser,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });

    return bulgarianUser;
  }

  private async createBulgarianUserFromSocial(user: User, provider: string): Promise<BulgarianUser> {
    const bulgarianUser = this.createBulgarianUserObject(user, {
      email: user.email!,
      displayName: user.displayName || user.email!.split('@')[0]
    });

    // Social login users are pre-verified
    bulgarianUser.isVerified = true;

    await setDoc(doc(db, 'users', user.uid), {
      ...bulgarianUser,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });

    return bulgarianUser;
  }

  private async updateLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        lastLogin: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  private validateSignUpData(email: string, password: string, userData: UserCreationData): void {
    if (!email || !email.includes('@')) {
      throw new Error('Невалиден имейл адрес');
    }

    if (!password || password.length < 6) {
      throw new Error('Паролата трябва да бъде поне 6 символа');
    }

    if (!userData.displayName || userData.displayName.trim().length < 2) {
      throw new Error('Името трябва да бъде поне 2 символа');
    }

    if (userData.phoneNumber && !BulgarianFirebaseUtils.isValidBulgarianPhone(userData.phoneNumber)) {
      throw new Error('Невалиден български телефонен номер');
    }
  }

  private getBulgarianErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'Потребителят не е намерен',
      'auth/wrong-password': 'Грешна парола',
      'auth/email-already-in-use': 'Имейлът вече се използва',
      'auth/weak-password': 'Паролата е твърде слаба',
      'auth/invalid-email': 'Невалиден имейл адрес',
      'auth/user-disabled': 'Потребителят е деактивиран',
      'auth/too-many-requests': 'Твърде много опити. Опитайте по-късно',
      'auth/network-request-failed': 'Проблем с интернет връзката',
      'auth/popup-closed-by-user': 'Прозорецът беше затворен преди завършване',
      'auth/cancelled-popup-request': 'Операцията беше отменена',
      'auth/invalid-credential': 'Невалидни данни за вход',
      'auth/requires-recent-login': 'Необходимо е повторно влизане',
      'auth/credential-already-in-use': 'Профилът вече се използва'
    };

    return errorMessages[errorCode] || 'Възникна грешка при удостоверяване';
  }
}

// Create singleton instance
export const bulgarianAuth = new BulgarianAuthService();

// Export for convenience
export default bulgarianAuth;
```

---

## 💬 قالب messaging-service.ts (الأولوية الثالثة)

```typescript
// src/services/messaging-service.ts
// Enhanced Messaging Service for Bulgarian Car Marketplace
// خدمة المراسلة المحسنة لسوق السيارات البلغاري

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
  DocumentReference,
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
  userPhoto?: string;
  text: string;
  timestamp: Date;
  language: 'bg' | 'en';
  type: 'comment' | 'question' | 'offer' | 'review' | 'complaint';
  rating?: number; // For reviews (1-5)
  price?: number; // For offers
  isSeller: boolean;
  isModerated: boolean;
  replies?: CarMessage[];
  parentId?: string; // For replies
  likes: number;
  likedBy: string[];
  isEdited: boolean;
  editedAt?: Date;
  attachments?: MessageAttachment[];
  metadata: {
    userAgent?: string;
    ipAddress?: string;
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
        userPhoto: currentUser.photoURL,
        text: BulgarianFirebaseUtils.sanitizeBulgarianText(text),
        timestamp: new Date(),
        language: currentUser.preferredLanguage,
        type,
        rating: options?.rating,
        price: options?.price,
        isSeller: currentUser.role === 'seller',
        isModerated: false,
        parentId: options?.parentId,
        likes: 0,
        likedBy: [],
        isEdited: false,
        attachments: options?.attachments || [],
        metadata: {
          source: 'web',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
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
      throw new Error('Трябва да сте влезли в системата');
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
        userPhoto: currentUser.photoURL,
        text: BulgarianFirebaseUtils.sanitizeBulgarianText(text),
        timestamp: new Date(),
        language: currentUser.preferredLanguage,
        type: 'comment',
        isSeller: currentUser.role === 'seller',
        isModerated: false,
        likes: 0,
        likedBy: [],
        isEdited: false,
        attachments: attachments || [],
        metadata: {
          source: 'web'
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
      throw new Error('Трябва да сте влезли в системата');
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

    return filteredMessages.map(id => messageMap.get(id) || id);
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
```

---

## 📝 قالب index.ts (ملف التصدير الرئيسي)

```typescript
// src/services/index.ts
// Main export file for Bulgarian Firebase Services
// ملف التصدير الرئيسي لخدمات Firebase البلغارية

// Core Firebase Configuration
export * from './firebase-config';
export { 
  app, 
  auth, 
  db, 
  storage, 
  functions, 
  analytics,
  BULGARIAN_CONFIG,
  BulgarianFirebaseUtils 
} from './firebase-config';

// Authentication Service
export * from './auth-service';
export { 
  bulgarianAuth,
  BulgarianAuthService 
} from './auth-service';
export type { BulgarianUser } from './auth-service';

// Messaging Service
export * from './messaging-service';
export { 
  bulgarianMessaging,
  BulgarianMessagingService 
} from './messaging-service';
export type { 
  CarMessage, 
  ChatRoom, 
  MessageNotification,
  MessageFilters,
  MessageStats,
  MessageAttachment
} from './messaging-service';

// Re-export Firebase SDK for convenience
export {
  initializeApp,
  getApps,
  getApp,
  deleteApp
} from 'firebase/app';

export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  deleteUser
} from 'firebase/auth';

export {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

export {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';

export {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator
} from 'firebase/functions';

export {
  getAnalytics,
  logEvent,
  setUserProperties,
  setCurrentScreen
} from 'firebase/analytics';

// Quick setup function for Bulgarian Car Marketplace
export async function initializeBulgarianFirebase() {
  try {
    console.log('🔥 Initializing Bulgarian Firebase...');
    
    // Import services
    const { app, auth, db, storage, functions } = await import('./firebase-config');
    const { bulgarianAuth } = await import('./auth-service');
    const { bulgarianMessaging } = await import('./messaging-service');

    // Verify initialization
    if (!app || !auth || !db) {
      throw new Error('Failed to initialize Firebase services');
    }

    console.log('✅ Bulgarian Firebase initialized successfully!');
    console.log('🇧🇬 Bulgarian Car Marketplace Firebase Services Ready');
    console.log(`💰 Currency: ${BULGARIAN_CONFIG.currency}`);
    console.log(`📍 Region: ${BULGARIAN_CONFIG.region}`);
    console.log(`🌍 Locale: ${BULGARIAN_CONFIG.locale}`);

    return {
      app,
      auth,
      db,
      storage,
      functions,
      bulgarianAuth,
      bulgarianMessaging,
      config: BULGARIAN_CONFIG,
      utils: BulgarianFirebaseUtils
    };
  } catch (error) {
    console.error('❌ Failed to initialize Bulgarian Firebase:', error);
    throw error;
  }
}

// Utility functions for Bulgarian context
export const bulgarianUtils = {
  // Format price in Bulgarian style
  formatPrice: (price: number): string => {
    return BulgarianFirebaseUtils.formatCurrency(price);
  },
  
  // Format date in Bulgarian style
  formatDate: (date: Date): string => {
    return BulgarianFirebaseUtils.formatTimestamp(date);
  },
  
  // Validate Bulgarian phone number
  validatePhone: (phone: string): boolean => {
    return BulgarianFirebaseUtils.isValidBulgarianPhone(phone);
  },
  
  // Generate car ID
  generateCarId: (): string => {
    return BulgarianFirebaseUtils.generateBulgarianId('CAR');
  },
  
  // Generate user ID
  generateUserId: (): string => {
    return BulgarianFirebaseUtils.generateBulgarianId('USER');
  },
  
  // Generate message ID
  generateMessageId: (): string => {
    return BulgarianFirebaseUtils.generateBulgarianId('MSG');
  },
  
  // Sanitize text input
  sanitizeText: (text: string): string => {
    return BulgarianFirebaseUtils.sanitizeBulgarianText(text);
  },
  
  // Check if text is in Bulgarian
  isBulgarianText: (text: string): boolean => {
    return BulgarianFirebaseUtils.containsBulgarianText(text);
  },
  
  // Format address
  formatAddress: (address: any): string => {
    return BulgarianFirebaseUtils.formatBulgarianAddress(address);
  }
};

// Common type definitions
export interface BulgarianFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface BulgarianServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Error handling utility
export class BulgarianFirebaseError extends Error {
  public code: string;
  public details?: any;

  constructor(message: string, code?: string, details?: any) {
    super(message);
    this.name = 'BulgarianFirebaseError';
    this.code = code || 'unknown-error';
    this.details = details;
  }
}

// Service status checker
export async function checkBulgarianFirebaseStatus(): Promise<{
  auth: boolean;
  firestore: boolean;
  storage: boolean;
  functions: boolean;
}> {
  try {
    const status = {
      auth: false,
      firestore: false,
      storage: false,
      functions: false
    };

    // Check Auth
    try {
      status.auth = !!auth.app;
    } catch (error) {
      console.error('Auth not available:', error);
    }

    // Check Firestore
    try {
      status.firestore = !!db.app;
    } catch (error) {
      console.error('Firestore not available:', error);
    }

    // Check Storage
    try {
      status.storage = !!storage.app;
    } catch (error) {
      console.error('Storage not available:', error);
    }

    // Check Functions
    try {
      status.functions = !!functions.app;
    } catch (error) {
      console.error('Functions not available:', error);
    }

    return status;
  } catch (error) {
    console.error('Error checking Firebase status:', error);
    return {
      auth: false,
      firestore: false,
      storage: false,
      functions: false
    };
  }
}

// Default Bulgarian Firebase configuration template
export const defaultBulgarianFirebaseConfig: BulgarianFirebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "globul-cars.firebaseapp.com",
  projectId: "globul-cars",
  storageBucket: "globul-cars.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-ABCDEFGHIJ"
};

// Export version information
export const BULGARIAN_FIREBASE_VERSION = '1.0.0';
export const LAST_UPDATED = '2025-09-19';

console.log(`📦 Bulgarian Firebase Services v${BULGARIAN_FIREBASE_VERSION} loaded`);
console.log(`📅 Last updated: ${LAST_UPDATED}`);
```

---

**🎯 هذه هي القوالب الأساسية الثلاثة التي يجب البدء بها فوراً:**

1. **`firebase-config.ts`** ← ابدأ هنا أولاً
2. **`auth-service.ts`** ← ثاني أهم ملف  
3. **`messaging-service.ts`** ← ثالث أهم ملف
4. **`index.ts`** ← ملف التصدير النهائي

**🚀 بمجرد إنجاز هذه الملفات الأربعة، ستحصل على نظام متكامل للمصادقة والمراسلة جاهز للاستخدام!**