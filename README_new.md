# 🇧🇬 Bulgarian Car Marketplace - Firebase Services

Bulgarian Car Marketplace - Integrated Firebase system with full support for Bulgarian and European customizations.

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
- Bulgarian language error and success messages
- Role management (buyer, seller, admin, moderator)

### 💬 `realtimeMessaging.ts`
**Advanced real-time messaging system**
- Real-time messaging between buyers and sellers
- Real-time typing indicators
- Chat room management
- Attachments and images support
- New message notifications
- Read/unread message tracking
- Support for car-specific conversations

### 🎨 `ChatInterface.tsx`
**Interactive chat interface**
- Modern and responsive interface
- Text and image message support
- Typing indicator with animations
- Message status display (sent/read)
- Bulgarian time formatting
- Conversation closure capability

### 📋 `ChatList.tsx`
**Active conversations list**
- Display all active conversations
- Unread message count
- Last message preview
- Related car information
- Smart chronological ordering
- Conversation search

### 📄 `MessagesPage.tsx`
**Complete messaging page**
- Responsive layout with conversation list
- Main chat interface
- Selected conversation state management
- Navigation between conversations
- Empty state display when no conversations exist

### 📦 `index.ts`
**Main export file for all services**
- Export all services and utilities
- Helper functions for daily use
- Automatic service setup
- Service status check
- Support for direct and flexible imports

### 🧪 `services-test.ts`
**Comprehensive service testing system**
- Firebase initialization tests
- Bulgarian function tests
- Mock services for testing
- Service status check
- Detailed result reports

## ✨ New Features

### 💬 Real-time Messaging
- **Real-time messaging**: Instant chat system between buyers and sellers
- **Typing indicators**: Real-time "typing now..." status display
- **Conversation management**: Automatic creation and management of chat rooms
- **Smart notifications**: Tracking new and read messages
- **Car support**: Linking conversations to specific cars
- **Modern interface**: Responsive design with full Bulgarian support

### 🔍 Advanced Search
- **Comprehensive filtering**: Search by price, year, mileage, type
- **Smart search**: Client-side search to bypass Firestore limitations
- **Bulgarian interface**: All texts and labels in Bulgarian language
- **Instant results**: Results update when filters change
- **Preference saving**: Remember last search settings

### 📸 Image Management
- **Multiple upload**: Upload multiple images with drag and drop
- **Interactive gallery**: Display images in gallery with navigation
- **Performance optimization**: Image compression and quality optimization
- **Format support**: JPG, PNG, GIF support with validation
- **Instant preview**: Display images immediately after upload

### 🌐 Comprehensive Translation
- **Two main languages**: Full support for Bulgarian and English
- **Advanced Hook**: Translation system with Context API
- **Complete coverage**: Translation of all texts and messages
- **Bulgarian formatting**: Dates and numbers in Bulgarian format
- **Easy expansion**: Add new languages easily

### 🧪 Enhanced Testing System
- **Comprehensive coverage**: Tests for all services and components
- **Advanced mocking**: Mocking Firebase and React Router
- **Instant testing**: Jest + React Testing Library
- **Detailed reports**: Clear results with error details
- **CI/CD ready**: Ready for integration with build systems

## 🚀 Quick Start

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

### 4. Using Services
```typescript
import {
  initializeBulgarianFirebase,
  bulgarianAuth,
  bulgarianMessaging,
  bulgarianUtils
} from './index';

// Initialize Firebase
await initializeBulgarianFirebase();

// Register new user
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

// Add comment to car
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

// Generate unique IDs
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