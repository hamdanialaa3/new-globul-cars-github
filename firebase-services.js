// src/services/firebase-services.ts
// Complete Firebase Services Integration for Bulgarian Car Marketplace
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
// Firebase configuration with proper typing
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || ''
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Core Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
// Advanced Services Container
export const advancedServices = {
    analytics: undefined,
    messaging: undefined,
    performance: undefined,
    remoteConfig: undefined
};
// Initialize Analytics (Browser only)
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported && process.env.NODE_ENV === 'production') {
            advancedServices.analytics = getAnalytics(app);
        }
    });
}
// Initialize Messaging (Browser only with service worker)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
        advancedServices.messaging = getMessaging(app);
    }
    catch (error) {
        console.warn('Firebase Messaging initialization failed:', error);
    }
}
// Initialize Performance Monitoring
if (typeof window !== 'undefined') {
    try {
        advancedServices.performance = getPerformance(app);
    }
    catch (error) {
        console.warn('Firebase Performance initialization failed:', error);
    }
}
// Initialize Remote Config
if (typeof window !== 'undefined') {
    try {
        advancedServices.remoteConfig = getRemoteConfig(app);
        // Set default values
        advancedServices.remoteConfig.defaultConfig = {
            'max_car_images': 20,
            'enable_chat': true,
            'enable_notifications': true,
            'maintenance_mode': false,
            'app_version': '1.0.0'
        };
    }
    catch (error) {
        console.warn('Firebase Remote Config initialization failed:', error);
    }
}
// Bulgarian Car Marketplace Service Classes
export class BulgarianCarServices {
    // Authentication Service
    static async signInWithEmail(email, password) {
        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: result.user };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    static async signUpWithEmail(email, password, userData) {
        try {
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // Save additional user data to Firestore
            const { doc, setDoc } = await import('firebase/firestore');
            const userDocRef = doc(db, 'users', result.user.uid);
            await setDoc(userDocRef, {
                ...userData,
                createdAt: new Date(),
                role: 'user'
            });
            return { success: true, user: result.user };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Firestore Services
    static async addCar(carData) {
        try {
            const { collection, addDoc } = await import('firebase/firestore');
            const carsCollection = collection(db, 'cars');
            const docRef = await addDoc(carsCollection, {
                ...carData,
                createdAt: new Date(),
                status: 'active'
            });
            return { success: true, id: docRef.id };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    static async getCars(filters = {}) {
        try {
            const { collection, query, where, getDocs } = await import('firebase/firestore');
            let carsQuery = query(collection(db, 'cars'), where('status', '==', 'active'));
            if (filters.brand) {
                carsQuery = query(carsQuery, where('brand', '==', filters.brand));
            }
            if (filters.priceMin) {
                carsQuery = query(carsQuery, where('price', '>=', filters.priceMin));
            }
            if (filters.priceMax) {
                carsQuery = query(carsQuery, where('price', '<=', filters.priceMax));
            }
            const snapshot = await getDocs(carsQuery);
            const cars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return { success: true, cars };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Storage Services
    static async uploadCarImage(file, carId) {
        try {
            const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
            const storageRef = ref(storage);
            const imageRef = ref(storageRef, `cars/${carId}/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return { success: true, url: downloadURL };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Cloud Functions
    static async sendNotification(userId, title, body) {
        try {
            const sendNotificationFn = httpsCallable(functions, 'sendNotification');
            const result = await sendNotificationFn({ userId, title, body });
            return { success: true, result: result.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Messaging (FCM)
    static async requestNotificationPermission() {
        if (!advancedServices.messaging)
            return { success: false, error: 'Messaging not available' };
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const vapidKey = process.env.REACT_APP_FCM_VAPID_KEY || '';
                const token = await getToken(advancedServices.messaging, { vapidKey });
                return { success: true, token };
            }
            return { success: false, error: 'Permission denied' };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    static onMessageReceived(callback) {
        if (!advancedServices.messaging)
            return;
        onMessage(advancedServices.messaging, callback);
    }
    // Remote Config
    static async getRemoteConfigValue(key) {
        if (!advancedServices.remoteConfig)
            return null;
        try {
            await fetchAndActivate(advancedServices.remoteConfig);
            const value = getValue(advancedServices.remoteConfig, key);
            return value.asString();
        }
        catch (error) {
            console.warn('Remote config fetch failed:', error);
            return null;
        }
    }
    // Analytics Events
    static logEvent(eventName, parameters = {}) {
        if (!advancedServices.analytics)
            return;
        console.log('Analytics event:', eventName, parameters);
    }
}
// Emulator Setup for Development
export const initializeEmulators = async () => {
    if (process.env.NODE_ENV === 'development') {
        try {
            // Connect to emulators
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
            connectFirestoreEmulator(db, 'localhost', 8080);
            connectStorageEmulator(storage, 'localhost', 9199);
            connectFunctionsEmulator(functions, 'localhost', 5001);
            console.log('🔥 Firebase emulators initialized for Bulgarian Car Marketplace');
        }
        catch (error) {
            console.warn('Firebase emulators already initialized or not available:', error.message);
        }
    }
};
export default app;
