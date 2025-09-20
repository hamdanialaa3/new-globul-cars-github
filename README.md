# 🇧🇬 Bulgarian Car Marketplace - Firebase Services

Complete Firebase integration for Bulgarian car marketplace with advanced services and Bulgarian localization.

## 🚀 Features

### Core Firebase Services
- **Authentication**: Google/Facebook login with Bulgarian user profiles
- **Firestore**: Real-time database for cars, users, and transactions
- **Storage**: File upload for car images and documents
- **Functions**: Serverless backend for business logic
- **Hosting**: Fast, secure web hosting with CDN

### Advanced Services
- **Analytics**: User behavior tracking and insights
- **Messaging (FCM)**: Push notifications for Bulgarian users
- **Performance Monitoring**: App performance tracking
- **Remote Config**: Dynamic configuration without app updates

### Bulgarian Localization
- Bulgarian currency (BGN) support
- Bulgarian timezone (Europe/Sofia)
- Bulgarian language UI and error messages
- Local market requirements compliance

## 📁 Project Structure

```
├── firebase-services.ts      # Complete Firebase services integration
├── firebase-config.ts        # Firebase initialization and config
├── auth-service.ts          # Authentication service
├── messaging-service.ts     # Real-time messaging
├── test-firebase-services.ts # Service testing utilities
├── admin-dashboard/         # Admin panel (React)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # Firebase service wrappers
│   │   └── pages/          # Admin pages
└── package.json            # Dependencies and scripts
```

## 🛠️ Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local` file:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_FCM_VAPID_KEY=your_vapid_key
```

### 3. Firebase Configuration
Update `firebase.json`:
```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": {
    "source": "functions"
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

## 🔧 Usage

### Basic Usage
```typescript
import { BulgarianCarServices } from './firebase-services';

// Add a car
const result = await BulgarianCarServices.addCar({
  brand: 'BMW',
  model: 'X5',
  year: 2023,
  price: 85000,
  currency: 'BGN',
  location: 'София'
});

// Get cars with filters
const cars = await BulgarianCarServices.getCars({
  brand: 'BMW',
  priceMin: 50000,
  priceMax: 100000
});
```

### Authentication
```typescript
import { BulgarianCarServices } from './firebase-services';

// Sign up
const signupResult = await BulgarianCarServices.signUpWithEmail(
  'user@example.com',
  'password',
  { displayName: 'Иван Иванов', preferredLanguage: 'bg' }
);

// Sign in
const signinResult = await BulgarianCarServices.signInWithEmail(
  'user@example.com',
  'password'
);
```

### File Upload
```typescript
import { BulgarianCarServices } from './firebase-services';

// Upload car image
const uploadResult = await BulgarianCarServices.uploadCarImage(
  imageFile,
  carId
);
```

### Push Notifications
```typescript
import { BulgarianCarServices } from './firebase-services';

// Request permission and get token
const notificationResult = await BulgarianCarServices.requestNotificationPermission();

// Listen for messages
BulgarianCarServices.onMessageReceived((payload) => {
  console.log('Received message:', payload);
});
```

### Remote Config
```typescript
import { BulgarianCarServices } from './firebase-services';

// Get remote config value
const maxImages = await BulgarianCarServices.getRemoteConfigValue('max_car_images');
```

## 🧪 Testing

### Run Service Tests
```bash
# Test Firebase services
npx ts-node test-firebase-services.ts

# Test with emulators
npm run test:emulators
```

### Development with Emulators
```bash
# Start Firebase emulators
firebase emulators:start

# Initialize emulators in code
import { initializeEmulators } from './firebase-services';
await initializeEmulators();
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Build the app
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Full Deployment
```bash
# Deploy all services
firebase deploy
```

## 📊 Analytics & Monitoring

### Analytics Events
```typescript
import { BulgarianCarServices } from './firebase-services';

// Log custom events
BulgarianCarServices.logEvent('car_viewed', {
  carId: '123',
  brand: 'BMW',
  price: 85000
});
```

### Performance Monitoring
Performance monitoring is automatically enabled in production and tracks:
- App startup time
- Network requests
- Custom traces
- Screen rendering performance

## 🔒 Security

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cars collection
    match /cars/{carId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cars/{carId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🌐 Bulgarian Localization

### Currency Support
- Automatic BGN currency formatting
- Bulgarian number formatting
- Local price ranges and calculations

### Language Support
- Bulgarian UI text and messages
- Localized error messages
- Bulgarian date/time formatting

### Regional Features
- Bulgarian cities and regions
- Local car market terminology
- Bulgarian legal requirements compliance

## 🐛 Troubleshooting

### Common Issues

**Emulator Connection Issues**
```bash
# Check emulator status
firebase emulators:status

# Restart emulators
firebase emulators:start --import=./emulator-data --export-on-exit=./emulator-data
```

**Authentication Errors**
- Check Firebase Console > Authentication > Sign-in methods
- Verify API keys in environment variables
- Ensure correct redirect URIs for OAuth providers

**Firestore Permission Errors**
- Review Firestore security rules
- Check user authentication status
- Verify data structure matches rules

## 📚 API Reference

### BulgarianCarServices Class

#### Authentication Methods
- `signInWithEmail(email, password)` - Sign in with email/password
- `signUpWithEmail(email, password, userData)` - Create new account

#### Database Methods
- `addCar(carData)` - Add new car listing
- `getCars(filters)` - Get cars with optional filters
- `updateCar(carId, updates)` - Update car information
- `deleteCar(carId)` - Delete car listing

#### Storage Methods
- `uploadCarImage(file, carId)` - Upload car image
- `deleteCarImage(imageUrl)` - Delete car image

#### Messaging Methods
- `requestNotificationPermission()` - Request FCM permission
- `onMessageReceived(callback)` - Listen for FCM messages

#### Configuration Methods
- `getRemoteConfigValue(key)` - Get remote config value
- `logEvent(eventName, parameters)` - Log analytics event

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check Firebase documentation
- Review Bulgarian localization guidelines

---

🇧🇬 **Built for Bulgarian Car Market with ❤️ using Firebase**
**M## ✨ N### � Real-time Messaging## � Real-time Messaging## � Real-time Messaging## � Real-time Messagingw Features

### � Real-time Messaging
- **Real-time messaging**: Instant chat system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timexport file for all services**
- Export all services and tools
- Helper functions for daily use
- Automatic service setup
- Service status checking
- Support for direct and flexible import**Ma## ✨ New Features

### � Real-time Messaging
- **Real-time messaging**: Instant chat system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-time
- **Conversation management**: Automatic creation and management of chat roomsort file for all services**
- Export all services and tools
- Helper functions for daily use
- Automatic service setup
- Service status checking
- Support for direct and flexible import
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timeport file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import support
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timeport file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import support
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timeport file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import support
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timeport file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import support
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timeport file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import support
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timeport file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import support
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-timeport file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import support`
**Ma## ✨ New Features

### � Real-time Messaging (Real-time Messaging)export file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import supports`
**M## ✨ New Features

### � Real-time Messaging (Real-time Messaging) export file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import supporta## ✨ New Features

### � Real-time Messaging (Real-time Messaging)
- **Real-time messaging**: Instant messaging system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-time
- **Conversation management**: Automatic creation and management of chat rooms
- **Smart notifications**: Tracking new and read messages
- **Car support**: Linking conversations to specific cars
- **Modern interface**: Responsive design with full Bulgarian support file for all services**
- Export all services and utilities
- Daily usage helper functions
- Automatic service setup
- Service status checking
- Flexible direct import supportCar Marketplace - Integrated Firebase system with full support for Bulgarian and European customizations.

## 📁 Core Files

### 🔧 `firebase-config.ts`
**Firebase Configuration optimized for Bulgaria**
- Firebase setup with Bulgarian customizations
- Support for European currency (EUR) and Bulgarian formatting
- Europe/Sofia timezone settings
- Comprehensive Bulgarian formatting utilities
- Firebase emulators support for local development

### 🔐 `auth-service.ts`
**Advanced authentication system for Bulgarian users**
- Multi-language login system (BG/EN)
- Google and Facebook login support
- Bulgarian user profile management with BulgarianUser interface
- Bulgarian phone number validation (+359)
- Bulgarian error and success messages
- Role management (buyer, seller, admin, moderator)

### 💬 `realtimeMessaging.ts`
**Advanced real-time messaging system**
- Real-time messaging between buyers and sellers
- Real-time typing indicators
- Chat room management
- Attachment and image support
- New message notifications
- Read/unread message tracking
- Support for car-specific conversations

### 🎨 `ChatInterface.tsx`
**Interactive chat interface**
- Modern and responsive interface
- Support for text messages and images
- Typing indicator with animations
- Message status display (sent/read)
- Bulgarian time formatting
- Conversation closure capability

### 📋 `ChatList.tsx`
**Active conversations list**
- Display all active conversations
- Number of unread messages
- Preview of last message
- Information about related car
- Smart time ordering
- Conversation search

### 📄 `MessagesPage.tsx`
**Complete messaging page**
- Responsive layout with conversation list
- Main chat interface
- Management of selected conversation state
- Support for navigation between conversations
- Empty state display when no conversations exist

### � `index.ts`
**Main export file for all services**
- Export all services and tools
- Helper functions for daily use
- Automatic service setup
- Service status checking
- Support for direct and flexible import

### 🧪 `services-test.ts`
**Comprehensive service testing system**
- Firebase initialization tests
- Bulgarian function tests
- Mock service tests
- Service status checking
- Detailed results reports

## ✨ New Features

### � المراسلة الفورية (Real-time Messaging)
- **Real-time messaging**: Instant chat system between buyers and sellers
- **Typing indicators**: Display "typing now..." status in real-time
- **Conversation management**: Automatic creation and management of chat rooms
- **Smart notifications**: Track new and read messages
- **Car support**: Link conversations to specific cars
- **Modern interface**: Responsive design with full Bulgarian support

### 🎨 Advanced Search (Advanced Search)
- **Comprehensive filtering**: Search by price, year, mileage, type
- **Smart search**: Client-side search to bypass Firestore limitations
- **Bulgarian interface**: All texts and labels in Bulgarian language
- **Instant results**: Update results when filters change
- **Preference saving**: Remember last search settings

### 📸 Image Management (Image Management)
- **Multiple uploads**: Upload multiple images with drag and drop
- **Interactive gallery**: View images in interactive gallery with navigation
- **Performance optimization**: Image compression and quality optimization
- **Format support**: Support JPG, PNG, GIF with validation
- **Instant preview**: Display images immediately after upload

### 🌐 Comprehensive Translation (Comprehensive Translation)
- **Two main languages**: Full support for Bulgarian and English
- **Advanced Hook**: Translation system with Context API
- **Complete coverage**: Translation of all texts and messages
- **Bulgarian formatting**: Dates and numbers in Bulgarian format
- **Easy expansion**: Add new languages easily

### 🧪 Enhanced Testing System (Enhanced Testing)
- **Comprehensive coverage**: Tests for all services and components
- **Advanced Mocking**: Firebase and React Router simulation
- **Instant tests**: Jest + React Testing Library
- **Detailed reports**: Clear results with error details
- **CI/CD ready**: Ready for integration with build systems

### 1. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Update Firebase variables in .env
# VITE_FIREBASE_API_KEY=your-api-key-here
# VITE_FIREBASE_PROJECT_ID=globul-cars
# etc...
```

### 2. Run Firebase Emulators
```bash
# Run all emulators
firebase emulators:start

# Or run specific emulators
firebase emulators:start --only auth,firestore,storage
```

### 3. Test Services
```bash
# Run service tests
npm run test:services

# Or run directly
node services-test.ts
```

### 4. Use Services
```typescript
import {
  initializeBulgarianFirebase,
  bulgarianAuth,
  bulgarianMessaging,
  bulgarianUtils
} from './index';

// تهيئة Firebase
await initializeBulgarianFirebase();

// تسجيل مستخدم جديد
const user = await bulgarianAuth.signUp(
  'user@globul-cars.bg',
  'password123',
  {
    displayName: 'Иван Иванов',
    phoneNumber: '+359888123456',
    preferredLanguage: 'bg',
    location: 'София'
  }
);

// Add comment on car
const messageId = await bulgarianMessaging.sendCarMessage(
  'CAR-BG-123456-ABCDEF',
  'Отлична кола! Може ли да се видим?',
  'question'
);

// Use helper utilities
const formattedPrice = bulgarianUtils.formatPrice(25000); // "25,000.00 €"
const isValidPhone = bulgarianUtils.validatePhone('+359888123456'); // true
```

## 🌍 Advanced Bulgarian Features

### 💰 Currency and Formatting System
```typescript
import { BulgarianFirebaseUtils } from './firebase-config';

// Format European currency
const price = BulgarianFirebaseUtils.formatCurrency(25000); // "25 000,00 €"

// Format Bulgarian date
const date = BulgarianFirebaseUtils.formatTimestamp(firebaseTimestamp);
// "15 декември 2024 г., 14:30"

BulgarianFirebaseUtils.formatBulgarianDate(new Date());
// "15.12.2024"
```

### 📱 Bulgarian Data Validation
```typescript
// Validate Bulgarian phone number
const isValid = BulgarianFirebaseUtils.validateBulgarianPhone('+359888123456'); // true

// Validate Bulgarian postal code
const isValidPostal = BulgarianFirebaseUtils.validateBulgarianPostalCode('1000'); // true

// Get Bulgarian time
const bulgarianTime = BulgarianFirebaseUtils.getBulgarianTime();

// Clean Bulgarian text
const cleanText = BulgarianFirebaseUtils.sanitizeBulgarianText('Hello <script>alert("hack")</script> World!');
```

### 🆔 Bulgarian ID Generation
```typescript
import { bulgarianUtils } from './index';

// Generate unique identifiers
const carId = bulgarianUtils.generateCarId();     // "BG-CAR-1A2B3C-XYZ789"
const userId = bulgarianUtils.generateUserId();   // "BG-USER-1A2B3C-XYZ789"
const msgId = bulgarianUtils.generateMessageId(); // "BG-MSG-1A2B3C-XYZ789"
```

## 🔧 Detailed Environment Setup

### Required Environment Variables (.env)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-actual-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=globul-cars.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=globul-cars
VITE_FIREBASE_STORAGE_BUCKET=globul-cars.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ

# Bulgarian Configuration
VITE_BULGARIAN_CURRENCY=EUR
VITE_BULGARIAN_REGION=Bulgaria
VITE_BULGARIAN_LOCALE=bg-BG
VITE_BULGARIAN_TIMEZONE=Europe/Sofia
VITE_BULGARIAN_DEFAULT_LANGUAGE=bg

# Development Environment
VITE_USE_EMULATORS=true
VITE_NODE_ENV=development

# Security
VITE_ENCRYPTION_KEY=your-encryption-key-here
VITE_JWT_SECRET=your-jwt-secret-here

# External Services
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### Firebase Configuration (firebase.json)
```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": {
    "predeploy": ["npm --prefix \"$RESOURCE_DIR\" run lint"]
  },
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  },
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "functions": { "port": 5001 },
    "storage": { "port": 9199 },
    "ui": { "enabled": true, "port": 4000 }
  }
}
```

## 📊 Database Structure

### Main Firestore Collections
```
users/                          # Bulgarian user profiles
  ├── {userId}/
  │   ├── displayName: string     # Name in Bulgarian language
  │   ├── email: string
  │   ├── phoneNumber: string     # Bulgarian phone number (+359)
  │   ├── preferredLanguage: 'bg' | 'en'
  │   ├── currency: 'EUR'
  │   ├── timezone: 'Europe/Sofia'
  │   ├── role: 'buyer' | 'seller' | 'admin' | 'moderator'
  │   ├── location: string        # Bulgarian city
  │   └── statistics: object      # User statistics

cars/                           # Cars listed for sale
  ├── {carId}/
  │   ├── title: string          # Listing title
  │   ├── price: number          # Price in euros
  │   ├── currency: 'EUR'
  │   ├── location: string       # Car location
  │   ├── lastActivity: timestamp
  │   └── messageCount: object   # Message count by type

carMessages/                    # Car comments and questions
  ├── {messageId}/
  │   ├── carId: string
  │   ├── userId: string
  │   ├── text: string           # Text (full Bulgarian support)
  │   ├── type: 'comment' | 'question' | 'offer' | 'review'
  │   ├── rating?: number        # Rating (1-5)
  │   ├── price?: number         # Offer price
  │   ├── language: 'bg' | 'en'
  │   ├── likes: number
  │   └── timestamp: timestamp

chatRooms/                      # Chat rooms
  ├── {chatRoomId}/
  │   ├── participants: string[]
  │   ├── carId: string
  │   ├── carTitle: string       # Car title
  │   ├── lastMessage: object
  │   ├── unreadCount: object    # Unread message count
  │   └── messageCount: number

chatMessages/                   # Chat messages
  ├── {messageId}/
  │   ├── chatRoomId: string
  │   ├── userId: string
  │   ├── text: string
  │   └── timestamp: timestamp

notifications/                  # Notifications
  ├── {notificationId}/
  │   ├── userId: string
  │   ├── type: string
  │   ├── title: string          # Title in Bulgarian language
  │   ├── body: string           # Notification content
  │   └── isRead: boolean
```

## 🛡️ Security and Compliance

### 🔒 Advanced Security Measures
- Sensitive data encryption using AES-256
- Validation of all inputs
- Protection from XSS and SQL injection
- Advanced rate limiting for API calls
- File encryption in Firebase Storage

### 📋 European and Bulgarian Compliance
- Full GDPR support for personal data
- European currency format (EUR) with Bulgarian separators
- Error and success messages in Bulgarian language
- Europe/Sofia timezone support
- Bulgarian data validation (phones, addresses, postal codes)

## 🧪 Comprehensive Testing System

### Running Tests
```bash
# Full service tests
npm run test:services

# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# Firebase tests
npm run test:firebase
```

### Available Test Types
- ✅ **Firebase Initialization Tests** - Firebase initialization check
- ✅ **Bulgarian Utilities Tests** - Bulgarian functions testing
- ✅ **Authentication Mock Tests** - Authentication tests
- ✅ **Messaging Mock Tests** - Messaging tests
- ✅ **Service Status Tests** - Service status check

## 📈 Monitoring and Analytics

### Firebase Analytics for Bulgaria
```typescript
import { analytics } from './firebase-config';

// Track car view
analytics.logEvent('car_view', {
  car_id: 'CAR-BG-123456-ABCDEF',
  user_type: 'buyer',
  language: 'bg',
  currency: 'EUR'
});

// Track message sent
analytics.logEvent('message_sent', {
  message_type: 'question',
  language: 'bg',
  car_category: 'седан'
});

// Track Bulgarian user signup
analytics.logEvent('bulgarian_user_signup', {
  signup_method: 'google',
  preferred_language: 'bg',
  location: 'София'
});
```

## 🔄 Deployment and Maintenance

### Deployment Setup
```bash
# Build project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy Functions
firebase deploy --only functions

# Deploy everything
firebase deploy
```

### Performance Monitoring
- Firebase Performance Monitoring
- Track Firestore reads/writes consumption
- Monitor Storage usage
- Slow query analytics

## 📞 Support and Help

### Troubleshooting
```bash
# Check service status
node -e "const { checkBulgarianFirebaseStatus } = require('./index.ts'); checkBulgarianFirebaseStatus().then(console.log);"

# Run detailed tests
node services-test.ts

# Check Firebase emulators
firebase emulators:start --inspect-functions
```

### Useful Resources
- 📚 [Firebase Documentation](https://firebase.google.com/docs)
- 🇧🇬 [Bulgarian Localization Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
- 💰 [EUR Currency Formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- 🕐 [Europe/Sofia Timezone](https://en.wikipedia.org/wiki/Europe/Sofia)

---

## 🎯 Summary

This system was developed by **GitHub Copilot** specifically for the Bulgarian **Globul Cars** platform, focusing on:

- ✅ **Full Bulgarian language support** and localized messages
- ✅ **European formatting** for currency and dates
- ✅ **Advanced security** and data protection
- ✅ **Optimized performance** with Firebase emulators
- ✅ **Comprehensive testing** for all services
- ✅ **Detailed documentation** in Bulgarian and English

🚗🇧🇬 **Globul Cars - Bulgaria's first car marketplace with advanced Firebase technology!**
  'car123',
  'Отлична кола! Колко е пробегът?',
  'question'
);

// Listen to car messages
const unsubscribe = bulgarianMessaging.listenToCarMessages('car123', (messages) => {
  console.log('New messages:', messages);
});
```

### 3. إنشاء غرفة دردشة
```typescript
// Create or get chat room
const chatRoomId = await bulgarianMessaging.createOrGetChatRoom('car123', 'seller456');

// Send message in chat
await bulgarianMessaging.sendChatMessage(chatRoomId, 'Здравейте, интересувам се от колата');
```

## 🌍 Bulgarian Features

### 💰 Currency and Formatting Support
```typescript
import { BulgarianFirebaseUtils } from './integrations/firebase-codelab/firebase-config';

// Format currency
const price = BulgarianFirebaseUtils.formatCurrency(25000); // "25,000.00 EUR"

// Format date
const date = BulgarianFirebaseUtils.formatTimestamp(firebaseTimestamp); // "15 декември 2024, 14:30"
```

### 📱 Bulgarian Data Validation
```typescript
// Validate Bulgarian phone number
const isValid = BulgarianFirebaseUtils.isValidBulgarianPhone('+359888123456'); // true

// Generate unique Bulgarian ID
const id = BulgarianFirebaseUtils.generateBulgarianId('CAR'); // "BG-CAR-1A2B3C-XYZ789"
```

## 🔧 Environment Setup

### Required Environment Variables
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=globul-cars.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=globul-cars
VITE_FIREBASE_STORAGE_BUCKET=globul-cars.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ

# Development
VITE_USE_EMULATORS=true
```

### Run Emulators
```bash
# Run Firebase emulators
firebase emulators:start

# Or run specific emulators
firebase emulators:start --only auth,firestore
```

## 📊 Database Structure

### Firestore Collections
```
users/                          # User profiles
  ├── {userId}/
  │   ├── displayName: string
  │   ├── email: string
  │   ├── phoneNumber: string
  │   ├── preferredLanguage: 'bg' | 'en'
  │   ├── currency: 'EUR'
  │   └── role: 'buyer' | 'seller' | 'admin'

cars/                           # Cars
  ├── {carId}/
  │   ├── title: string
  │   ├── price: number
  │   ├── currency: 'EUR'
  │   ├── location: string
  │   └── lastActivity: timestamp

carMessages/                    # Car comments
  ├── {messageId}/
  │   ├── carId: string
  │   ├── userId: string
  │   ├── text: string
  │   ├── type: 'comment' | 'question' | 'offer'
  │   └── timestamp: timestamp

chatRooms/                      # Chat rooms
  ├── {chatRoomId}/
  │   ├── participants: string[]
  │   ├── carId: string
  │   └── lastMessage: object

chatMessages/                   # Chat messages
  ├── {messageId}/
  │   ├── chatRoomId: string
  │   ├── userId: string
  │   ├── text: string
  │   └── timestamp: timestamp
```

## 🛡️ Security and Compliance

### 🔒 Security Measures
- Sensitive data encryption
- Input validation
- Protection from XSS attacks
- Rate limiting for API calls

### 📋 Bulgarian Compliance
- GDPR support for personal data
- European currency format
- Messages in Bulgarian language
- Bulgarian timezone support

## 🧪 Tests

### Running Tests
```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# Firebase tests
npm run test:ai
```

### Test Files
- `tests/firebase-codelab/auth-service.test.ts`
- `tests/firebase-codelab/messaging-service.test.ts`
- `tests/firebase-codelab/firebase-config.test.ts`

## 📈 Monitoring and Analytics

### Firebase Analytics
```typescript
// Track custom events
import { analytics } from './integrations/firebase-codelab/firebase-config';

// Track car view
analytics.logEvent('car_view', {
  car_id: 'car123',
  user_type: 'buyer'
});

// Track message sent
analytics.logEvent('message_sent', {
  message_type: 'question',
  language: 'bg'
});
```

## 🔄 Updates and Maintenance

### Version Management
- Use semantic versioning
- Document all changes
- Comprehensive tests before release

### Performance Monitoring
- Firebase Performance Monitoring
- Track resource consumption
- Optimize queries

## 📞 Support and Help

For help or reporting issues:
1. Check console logs
2. Review Firebase console for errors
3. Check environment settings
4. Review official Firebase documentation

---

**Developed by GitHub Copilot for Globul Auto Platform** 🇧🇬🚗