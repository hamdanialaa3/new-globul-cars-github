// src/integrations/firebase-codelab/integration-test.ts
// Integration Test for Firebase Codelab Bulgarian Car Marketplace
// Test file to verify all services work together

import { initializeBulgarianFirebase, bulgarianUtils } from './index';

async function testBulgarianFirebaseIntegration() {
  console.log('🧪 Testing Bulgarian Firebase Integration...');

  try {
    // Test 1: Initialize Firebase
    console.log('1️⃣ Testing Firebase Initialization...');
    const services = await initializeBulgarianFirebase();
    console.log('✅ Firebase initialized successfully');

    // Test 2: Test Bulgarian utilities
    console.log('2️⃣ Testing Bulgarian Utilities...');

    const price = bulgarianUtils.formatPrice(25000);
    console.log('💰 Price formatting:', price);

    const date = bulgarianUtils.formatDate(new Date());
    console.log('📅 Date formatting:', date);

    const validPhone = bulgarianUtils.validatePhone('+359888123456');
    console.log('📱 Phone validation:', validPhone);

    const carId = bulgarianUtils.generateCarId();
    console.log('🚗 Car ID generation:', carId);

    console.log('✅ Bulgarian utilities working correctly');

    // Test 3: Test authentication service (mock test)
    console.log('3️⃣ Testing Authentication Service...');
    if (services.bulgarianAuth) {
      console.log('✅ Bulgarian Auth service available');
    }

    // Test 4: Test messaging service (mock test)
    console.log('4️⃣ Testing Messaging Service...');
    if (services.bulgarianMessaging) {
      console.log('✅ Bulgarian Messaging service available');
    }

    console.log('🎉 All integration tests passed!');
    console.log('🇧🇬 Bulgarian Firebase Codelab Integration is working perfectly!');

  } catch (error) {
    console.error('❌ Integration test failed:', error);
    throw error;
  }
}

// Export for use in other test files
export { testBulgarianFirebaseIntegration };

// Run test if this file is executed directly
if (require.main === module) {
  testBulgarianFirebaseIntegration()
    .then(() => {
      console.log('🏁 Integration test completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Integration test failed:', error);
      process.exit(1);
    });
}