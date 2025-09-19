// src/firebase/auth-service.ts
// Bulgarian Authentication Service for Car Marketplace

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  applyActionCode,
  sendEmailVerification,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, BulgarianFirebaseUtils } from './firebase-config';
import { BULGARIAN_CONFIG } from '../config/bulgarian-config';

// Bulgarian User Interface
export interface BulgarianUser {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  photoURL?: string;
  bio?: string;
  preferredLanguage: 'bg' | 'en';
  location?: {
    city: string;
    region: string;
    postalCode: string;
  };
  profile: {
    isDealer: boolean;
    companyName?: string;
    taxNumber?: string;
    dealerLicense?: string;
    preferredCurrency: string;
    timezone: string;
  };
  preferences: {
    notifications: boolean;
    marketingEmails: boolean;
    language: 'bg' | 'en';
  };
  createdAt: Date;
  lastLoginAt: Date;
  isVerified: boolean;
}

// Bulgarian Authentication Service
export class BulgarianAuthService {
  private static instance: BulgarianAuthService;

  private constructor() {
    // Initialize auth state listener
    this.initializeAuthStateListener();
  }

  static getInstance(): BulgarianAuthService {
    if (!BulgarianAuthService.instance) {
      BulgarianAuthService.instance = new BulgarianAuthService();
    }
    return BulgarianAuthService.instance;
  }

  // Initialize auth state listener
  private initializeAuthStateListener(): void {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Update last login time
        await this.updateLastLogin(user.uid);
      }
    });
  }

  // Sign up with email and password
  async signUp(
    email: string,
    password: string,
    userData: Partial<BulgarianUser>
  ): Promise<UserCredential> {
    try {
      // Validate Bulgarian email format
      if (!this.validateBulgarianEmail(email)) {
        throw new Error('Невалиден имейл формат. Моля използвайте валиден български имейл адрес.');
      }

      // Validate password strength
      if (!this.validatePasswordStrength(password)) {
        throw new Error('Паролата трябва да съдържа поне 8 символа, главна буква, малка буква и цифра.');
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Create Bulgarian user profile
      const bulgarianUser: BulgarianUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userData.displayName || '',
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
        preferredLanguage: userData.preferredLanguage || 'bg',
        location: userData.location,
        profile: {
          isDealer: userData.profile?.isDealer || false,
          companyName: userData.profile?.companyName,
          taxNumber: userData.profile?.taxNumber,
          dealerLicense: userData.profile?.dealerLicense,
          preferredCurrency: BULGARIAN_CONFIG.currency,
          timezone: BULGARIAN_CONFIG.timezone
        },
        preferences: {
          notifications: true,
          marketingEmails: false,
          language: userData.preferredLanguage || 'bg'
        },
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isVerified: false
      };

      // Save user profile to Firestore
      await this.saveUserProfile(bulgarianUser);

      // Send email verification
      await sendEmailVerification(userCredential.user, {
        url: `${window.location.origin}/verify-email`,
        handleCodeInApp: true
      });

      return userCredential;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Update last login
      await this.updateLastLogin(userCredential.user.uid);

      return userCredential;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);

      // Check if user exists, if not create Bulgarian profile
      const userExists = await this.userExists(result.user.uid);
      if (!userExists) {
        await this.createUserFromSocialLogin(result.user, 'google');
      } else {
        await this.updateLastLogin(result.user.uid);
      }

      return result;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Facebook
  async signInWithFacebook(): Promise<UserCredential> {
    try {
      const provider = new FacebookAuthProvider();
      provider.setCustomParameters({
        display: 'popup'
      });

      const result = await signInWithPopup(auth, provider);

      // Check if user exists, if not create Bulgarian profile
      const userExists = await this.userExists(result.user.uid);
      if (!userExists) {
        await this.createUserFromSocialLogin(result.user, 'facebook');
      } else {
        await this.updateLastLogin(result.user.uid);
      }

      return result;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Get current user profile
  async getCurrentUserProfile(): Promise<BulgarianUser | null> {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data() as BulgarianUser;
      }
      return null;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Update user profile
  async updateUserProfile(updates: Partial<BulgarianUser>): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Няма активен потребител');

      // Validate Bulgarian phone if provided
      if (updates.phoneNumber && !BulgarianFirebaseUtils.validateBulgarianPhone(updates.phoneNumber)) {
        throw new Error('Невалиден български телефонен номер');
      }

      // Validate Bulgarian postal code if provided
      if (updates.location?.postalCode && !BulgarianFirebaseUtils.validateBulgarianPostalCode(updates.location.postalCode)) {
        throw new Error('Невалиден пощенски код');
      }

      // Update Firebase Auth profile
      if (updates.displayName || updates.photoURL) {
        await updateProfile(user, {
          displayName: updates.displayName,
          photoURL: updates.photoURL
        });
      }

      // Update Firestore profile
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true
      });
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Verify email
  async verifyEmail(actionCode: string): Promise<void> {
    try {
      await applyActionCode(auth, actionCode);

      // Update user verification status
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          isVerified: true,
          verifiedAt: new Date()
        });
      }
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Private helper methods
  private async saveUserProfile(user: BulgarianUser): Promise<void> {
    await setDoc(doc(db, 'users', user.uid), user);
  }

  private async userExists(uid: string): Promise<boolean> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists();
  }

  private async updateLastLogin(uid: string): Promise<void> {
    await updateDoc(doc(db, 'users', uid), {
      lastLoginAt: new Date()
    });
  }

  private async createUserFromSocialLogin(user: User, provider: string): Promise<void> {
    const bulgarianUser: BulgarianUser = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || '',
      photoURL: user.photoURL || undefined,
      preferredLanguage: 'bg',
      profile: {
        isDealer: false,
        preferredCurrency: BULGARIAN_CONFIG.currency,
        timezone: BULGARIAN_CONFIG.timezone
      },
      preferences: {
        notifications: true,
        marketingEmails: false,
        language: 'bg'
      },
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isVerified: true // Social login users are pre-verified
    };

    await this.saveUserProfile(bulgarianUser);
  }

  private validateBulgarianEmail(email: string): boolean {
    // Basic email validation with Bulgarian domain preference
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePasswordStrength(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  private handleAuthError(error: any): Error {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Този имейл вече е регистриран',
      'auth/weak-password': 'Паролата е твърде слаба',
      'auth/invalid-email': 'Невалиден имейл адрес',
      'auth/user-disabled': 'Този потребител е деактивиран',
      'auth/user-not-found': 'Потребителят не е намерен',
      'auth/wrong-password': 'Грешна парола',
      'auth/invalid-verification-code': 'Невалиден код за верификация',
      'auth/code-expired': 'Кодът за верификация е изтекъл',
      'auth/too-many-requests': 'Твърде много опити. Моля опитайте по-късно',
      'auth/network-request-failed': 'Проблем с интернет връзката',
      'auth/popup-closed-by-user': 'Прозорецът за вход беше затворен',
      'auth/cancelled-popup-request': 'Заявката беше отменена'
    };

    const bulgarianMessage = errorMessages[error.code] || 'Възникна грешка при вход';
    return new Error(bulgarianMessage);
  }
}

// Export singleton instance
export const bulgarianAuthService = BulgarianAuthService.getInstance();