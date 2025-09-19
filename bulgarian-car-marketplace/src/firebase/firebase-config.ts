// src/firebase/firebase-config.ts
// Firebase Configuration for Bulgarian Car Marketplace

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { BULGARIAN_CONFIG } from '../config/bulgarian-config';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || BULGARIAN_CONFIG.api.firebase.apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || BULGARIAN_CONFIG.api.firebase.authDomain,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || BULGARIAN_CONFIG.api.firebase.projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || BULGARIAN_CONFIG.api.firebase.storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || BULGARIAN_CONFIG.api.firebase.messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_APP_ID || BULGARIAN_CONFIG.api.firebase.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics (only in production and if measurement ID is provided)
const analytics: Analytics | null = (typeof window !== 'undefined' && process.env.VITE_FIREBASE_MEASUREMENT_ID)
  ? (() => {
      try {
        return getAnalytics(app);
      } catch (error) {
        console.warn('Analytics initialization failed:', error);
        return null;
      }
    })()
  : null;
export { analytics };

// Bulgarian Firebase Utilities
export class BulgarianFirebaseUtils {
  // Format currency in Bulgarian format
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat(BULGARIAN_CONFIG.locale, {
      style: 'currency',
      currency: BULGARIAN_CONFIG.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Validate Bulgarian phone number
  static validateBulgarianPhone(phone: string): boolean {
    const bulgarianPhoneRegex = /^(\+359|0)[8-9]\d{7,8}$/;
    return bulgarianPhoneRegex.test(phone.replace(/\s+/g, ''));
  }

  // Format Bulgarian phone number
  static formatBulgarianPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('359')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 12)}`;
    } else if (cleaned.startsWith('0')) {
      return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)}`;
    }
    return phone;
  }

  // Generate unique car ID
  static generateCarId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 7);
    return `CAR-${timestamp}-${random}`.toUpperCase();
  }

  // Sanitize Bulgarian text
  static sanitizeBulgarianText(text: string): string {
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim();
  }

  // Format Bulgarian date
  static formatBulgarianDate(date: Date): string {
    return new Intl.DateTimeFormat(BULGARIAN_CONFIG.locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }

  // Format Bulgarian datetime
  static formatBulgarianDateTime(date: Date): string {
    return new Intl.DateTimeFormat(BULGARIAN_CONFIG.locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Validate Bulgarian postal code
  static validateBulgarianPostalCode(code: string): boolean {
    const postalRegex = /^\d{4}$/;
    return postalRegex.test(code);
  }

  // Get Bulgarian currency symbol
  static getCurrencySymbol(): string {
    return BULGARIAN_CONFIG.currencySymbol;
  }

  // Format number in Bulgarian format
  static formatBulgarianNumber(num: number): string {
    return new Intl.NumberFormat(BULGARIAN_CONFIG.locale).format(num);
  }
}

export default app;