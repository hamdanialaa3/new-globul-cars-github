// src/services/auth-service.ts
// Enhanced Authentication Service for Bulgarian Car Marketplace
// Enhanced authentication service for Bulgarian Car Marketplace

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
  photoURL: string | undefined;
  phoneNumber: string | undefined;
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
    firstName: string | undefined;
    lastName: string | undefined;
    dateOfBirth: Date | undefined;
    gender: 'male' | 'female' | 'other' | undefined;
    address: {
      street: string | undefined;
      city: string;
      region: string | undefined;
      postalCode: string | undefined;
    } | undefined;
    website: string | undefined;
    bio: string | undefined;
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
// type AuthError = {
//   code: string;
//   message: string;
// };

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
        firstName: userData.profile?.firstName || undefined,
        lastName: userData.profile?.lastName || undefined,
        dateOfBirth: userData.profile?.dateOfBirth || undefined,
        gender: userData.profile?.gender || undefined,
        address: userData.profile?.address || {
          street: undefined,
          city: BULGARIAN_CONFIG.region,
          region: undefined,
          postalCode: undefined
        },
        website: userData.profile?.website || undefined,
        bio: userData.profile?.bio || undefined
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

  private async createBulgarianUserFromSocial(user: User, _provider: string): Promise<BulgarianUser> {
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

    if (userData.phoneNumber && !BulgarianFirebaseUtils.validateBulgarianPhone(userData.phoneNumber)) {
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
