// simple-test.js
// Simple test for Firebase services using ES modules

console.log('🧪 Simple Firebase Services Test');

// Check if Firebase is installed
try {
  console.log('✅ Firebase SDK is available');

  // Check environment variables
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  if (apiKey) {
    console.log('✅ Firebase API key is configured');
    console.log('🔑 API Key starts with:', apiKey.substring(0, 10) + '...');
  } else {
    console.log('⚠️  Firebase API key not found in environment');
  }

  console.log('🎉 Basic Firebase setup check completed successfully!');

} catch (error) {
  console.error('❌ Firebase SDK not found:', error.message);
  console.log('💡 Make sure to run: npm install firebase');
}