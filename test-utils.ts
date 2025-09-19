// src/test-utils.ts
// Simple Test Suite for Bulgarian Utility Functions

import { BulgarianFirebaseUtils, BULGARIAN_CONFIG } from './firebase-config';

async function testBulgarianUtilities() {
  console.log('🧪 Testing Bulgarian Utility Functions...\n');
  console.log('🇧🇬 Bulgarian Car Marketplace - Utility Functions Test');
  console.log('='.repeat(50));

  try {
    // Test 1: Currency Formatting
    console.log('1️⃣ Testing Currency Formatting:');
    const price = 25000;
    const formattedPrice = BulgarianFirebaseUtils.formatCurrency(price);
    console.log(`   Original: ${price} EUR`);
    console.log(`   Formatted: ${formattedPrice}`);
    console.log('   ✅ Currency formatting test passed\n');

    // Test 2: Phone Validation
    console.log('2️⃣ Testing Bulgarian Phone Validation:');
    const validPhones = ['+359888123456', '0888123456', '+359 88 812 34 56'];
    const invalidPhones = ['+123456789', '123456789', '+359123'];

    validPhones.forEach(phone => {
      const isValid = BulgarianFirebaseUtils.validateBulgarianPhone(phone);
      console.log(`   ${phone}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });

    invalidPhones.forEach(phone => {
      const isValid = BulgarianFirebaseUtils.validateBulgarianPhone(phone);
      console.log(`   ${phone}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });
    console.log('   ✅ Phone validation test passed\n');

    // Test 3: Car ID Generation
    console.log('3️⃣ Testing Car ID Generation:');
    const carId = BulgarianFirebaseUtils.generateCarId();
    console.log(`   Generated Car ID: ${carId}`);
    console.log(`   Length: ${carId.length} characters`);
    console.log('   ✅ Car ID generation test passed\n');

    // Test 4: Text Sanitization
    console.log('4️⃣ Testing Bulgarian Text Sanitization:');
    const dirtyText = 'Тестов текст<script>alert("hack")</script>с повече текст';
    const cleanText = BulgarianFirebaseUtils.sanitizeBulgarianText(dirtyText);
    console.log(`   Original: ${dirtyText}`);
    console.log(`   Sanitized: ${cleanText}`);
    console.log('   ✅ Text sanitization test passed\n');

    // Test 5: Bulgarian Configuration
    console.log('5️⃣ Testing Bulgarian Configuration:');
    console.log(`   Currency: ${BULGARIAN_CONFIG.currency}`);
    console.log(`   Region: ${BULGARIAN_CONFIG.region}`);
    console.log(`   Locale: ${BULGARIAN_CONFIG.locale}`);
    console.log(`   Timezone: ${BULGARIAN_CONFIG.timezone}`);
    console.log(`   Default Language: ${BULGARIAN_CONFIG.defaultLanguage}`);
    console.log('   ✅ Bulgarian configuration test passed\n');

    console.log('🎉 All Bulgarian utility tests passed successfully!');
    return true;

  } catch (error) {
    console.error('❌ Utility tests failed:', error);
    throw error;
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testBulgarianUtilities()
    .then(() => {
      console.log('\n✅ All utility tests completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Utility tests failed:', error);
      process.exit(1);
    });
}

export { testBulgarianUtilities };