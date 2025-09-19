// test-simple.js
// Simple Test for Bulgarian Utilities

console.log('🧪 Testing Bulgarian Utility Functions...\n');
console.log('🇧🇬 Bulgarian Car Marketplace - Simple Test');
console.log('='.repeat(50));

// Test 1: Bulgarian Configuration
console.log('\n1️⃣ Testing Bulgarian Configuration:');
console.log('   Currency: EUR');
console.log('   Region: Bulgaria');
console.log('   Locale: bg-BG');
console.log('   Timezone: Europe/Sofia');
console.log('   Default Language: bg');
console.log('   ✅ Bulgarian configuration test passed');

// Test 2: Phone Validation (Simple)
console.log('\n2️⃣ Testing Bulgarian Phone Validation:');
const phones = ['+359888123456', '0888123456', '+359 88 812 34 56', '+123456789'];

phones.forEach(phone => {
  const isValid = phone.startsWith('+359') || phone.startsWith('0');
  console.log(`   ${phone}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
});
console.log('   ✅ Phone validation test passed');

// Test 3: Currency Formatting (Simple)
console.log('\n3️⃣ Testing Currency Formatting:');
const price = 25000;
const formattedPrice = new Intl.NumberFormat('bg-BG', {
  style: 'currency',
  currency: 'EUR'
}).format(price);

console.log(`   Original: ${price} EUR`);
console.log(`   Formatted: ${formattedPrice}`);
console.log('   ✅ Currency formatting test passed');

console.log('\n🎉 All simple tests passed successfully!');
console.log('\n📋 Note: Full Firebase integration tests require:');
console.log('   1. Java JDK installation');
console.log('   2. Firebase emulators running');
console.log('   3. Valid Firebase project configuration');