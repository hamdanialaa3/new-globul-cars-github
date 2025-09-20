// Test Google Services Integration
// اختبار ربط خدمات جوجل

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

console.log('🚀 بدء اختبار خدمات جوجل...');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase initialized successfully');

// Test Auth
const auth = getAuth(app);
console.log('✅ Firebase Auth initialized');

// Test Firestore
const db = getFirestore(app);
console.log('✅ Firestore initialized');

// Test Storage
const storage = getStorage(app);
console.log('✅ Firebase Storage initialized');

// Test Functions
const functions = getFunctions(app);
console.log('✅ Firebase Functions initialized');

// Test Google Maps API Key
const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
if (mapsApiKey && mapsApiKey !== 'your-google-maps-api-key-here') {
  console.log('✅ Google Maps API Key configured');
} else {
  console.log('⚠️ Google Maps API Key not configured');
}

// Test Recaptcha Key
const recaptchaKey = process.env.RECAPTCHA_SITE_KEY;
if (recaptchaKey && recaptchaKey !== 'your-recaptcha-site-key-here') {
  console.log('✅ Recaptcha Site Key configured');
} else {
  console.log('⚠️ Recaptcha Site Key not configured');
}

console.log('🎉 انتهى اختبار خدمات جوجل!');
console.log('📧 الحساب المتصل:', process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log('🔗 المشروع:', process.env.REACT_APP_FIREBASE_PROJECT_ID);