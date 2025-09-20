// Simple Firebase Test
// اختبار Firebase البسيط

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCYxOoD-tViZHLh3XhdbwQo8rRA5Q56NVs",
  authDomain: "studio-448742006-a3493.firebaseapp.com",
  projectId: "studio-448742006-a3493",
  storageBucket: "studio-448742006-a3493.firebasestorage.app",
  messagingSenderId: "687922812237",
  appId: "1:687922812237:web:e2f36cf22eab4e53ddd304"
};

console.log('🚀 بدء اختبار Firebase...');

try {
  const app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');

  const db = getFirestore(app);
  console.log('✅ Firestore initialized');

  const storage = getStorage(app);
  console.log('✅ Storage initialized');

  console.log('🎉 Firebase services are working!');
  console.log('📧 المشروع:', firebaseConfig.projectId);

} catch (error) {
  console.error('❌ Firebase Error:', error.message);
}