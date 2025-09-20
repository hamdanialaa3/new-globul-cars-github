// src/services/index.ts
// Main export file for Bulgarian Firebase Services

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
  BulgarianFirebaseUtils,
  // Google Cloud Services
  bigquery,
  dialogflowClient,
  mapsLoader,
  visionClient,
  speechClient,
  ttsClient,
  translateClient,
  recaptchaClient,
  kmsClient,
  pubsubClient,
  cloudTasksClient
} from './firebase-config';

// Authentication Service
export * from './auth-service';
export { 
  bulgarianAuth,
  BulgarianAuthService 
} from './auth-service';
export type { BulgarianUser } from './auth-service';

// BigQuery Service
export * from './bigquery-service';
export { BulgarianBigQueryService } from './bigquery-service';

// Dialogflow Service
export * from './dialogflow-service';
export { BulgarianDialogflowService } from './dialogflow-service';

// Maps Service
export * from './maps-service';
export { BulgarianMapsService } from './maps-service';

// Vision Service
export * from './vision-service';
export { BulgarianVisionService } from './vision-service';

// Speech Service
export * from './speech-service';
export { BulgarianSpeechService } from './speech-service';

// Translation Service
export * from './translation-service';
export { BulgarianTranslationService } from './translation-service';

// Recaptcha Service
export * from './recaptcha-service';
export { BulgarianRecaptchaService } from './recaptcha-service';

// KMS Service
export * from './kms-service';
export { BulgarianKMSService } from './kms-service';

// Pub/Sub Service
export * from './pubsub-service';
export { BulgarianPubSubService } from './pubsub-service';

// Cloud Tasks Service
export * from './cloudtasks-service';
export { BulgarianCloudTasksService } from './cloudtasks-service';

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
    const { app, auth, db, storage, functions, BULGARIAN_CONFIG, BulgarianFirebaseUtils } = await import('./firebase-config');
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
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.formatCurrency(price);
  },
  
  // Format date in Bulgarian style
  formatDate: (date: Date): string => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.formatTimestamp(date);
  },
  
  // Validate Bulgarian phone number
  validatePhone: (phone: string): boolean => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.isValidBulgarianPhone(phone);
  },
  
  // Generate car ID
  generateCarId: (): string => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.generateBulgarianId('CAR');
  },
  
  // Generate user ID
  generateUserId: (): string => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.generateBulgarianId('USER');
  },
  
  // Generate message ID
  generateMessageId: (): string => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.generateBulgarianId('MSG');
  },
  
  // Sanitize text input
  sanitizeText: (text: string): string => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.sanitizeBulgarianText(text);
  },
  
  // Check if text is in Bulgarian
  isBulgarianText: (text: string): boolean => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
    return BulgarianFirebaseUtils.containsBulgarianText(text);
  },
  
  // Format address
  formatAddress: (address: any): string => {
    const { BulgarianFirebaseUtils } = require('./firebase-config');
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

    // Import services for status check
    const { auth, db, storage, functions } = await import('./firebase-config');

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