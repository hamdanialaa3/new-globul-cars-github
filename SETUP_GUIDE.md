# 🚀 Quick Setup Guide - Globul Cars Project

## ⚡ Quick Start

### **Step 1: Basic Environment Setup (5 minutes)**

```bash
# 1. Install Node.js (if not installed)
# Download from: https://nodejs.org/

# 2. Install global Firebase tools
npm install -g firebase-tools
npm install -g typescript

# 3. Login to Firebase
firebase login

# 4. Verify Git installation
git --version
```

### **Step 2: Firebase Project Setup (10 minutes)**

```bash
# 1. Create new Firebase project
# Go to: https://console.firebase.google.com/
# Click "Create project" and follow the steps

# 2. Enable required services:
# ✅ Authentication (Email/Password, Google, Facebook)
# ✅ Firestore Database
# ✅ Storage
# ✅ Functions
# ✅ Analytics

# 3. Get Firebase configuration
# Project Settings → General → Your apps → Config
```

### **Step 3: Local Project Setup (5 minutes)**

```bash
# 1. Navigate to project folder
cd "c:\Users\hamda\Desktop\New Globul Cars"

# 2. Install dependencies
npm install

# 3. Initialize Firebase in project
firebase init

# Choose:
# ✅ Firestore
# ✅ Functions
# ✅ Hosting
# ✅ Storage
# ✅ Emulators
```

---

## 🔧 Configuration Files Setup

### **`.env` file (create in root)**

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC4XJ9KvRQ6fJ6_JjUr-E8vXoMgN4D7pCE
VITE_FIREBASE_AUTH_DOMAIN=globul-cars.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=globul-cars
VITE_FIREBASE_STORAGE_BUCKET=globul-cars.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456ghi789
VITE_FIREBASE_MEASUREMENT_ID=G-ABCD123456

# Development Settings
VITE_USE_EMULATORS=true
NODE_ENV=development

# Google Cloud Platform
GCLOUD_PROJECT_ID=globul-cars
GOOGLE_APPLICATION_CREDENTIALS=./secrets/service-account-key.json

# Application Settings
VITE_APP_NAME=Globul Cars
VITE_APP_VERSION=1.0.0
VITE_DEFAULT_LANGUAGE=bg
VITE_DEFAULT_CURRENCY=EUR
VITE_DEFAULT_REGION=Bulgaria
```

### **Firebase.json file**

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log"
      ]
    }
  ],
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "functions": {
      "port": 5001
    },
    "firestore": {
      "port": 8080
    },
    "hosting": {
      "port": 5000
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    },
    "singleProjectMode": true
  }
}
```

### **`firestore.rules` file**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    
    // Cars collection
    match /cars/{carId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.uid == resource.data.sellerId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Car messages collection
    match /carMessages/{messageId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Chat rooms collection
    match /chatRooms/{roomId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
    
    // Chat messages collection
    match /chatMessages/{messageId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in get(/databases/$(database)/documents/chatRooms/$(resource.data.chatRoomId)).data.participants;
    }
  }
}
```

### **`storage.rules` file**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Car images
    match /cars/{carId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User avatars
    match /users/{userId}/avatar {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User uploads
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📦 Update package.json

```json
{
  "name": "globul-cars",
  "version": "1.0.0",
  "description": "Bulgarian Car Marketplace with Firebase Integration",
  "main": "src/index.ts",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "start": "npm run dev",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "firebase:serve": "firebase emulators:start",
    "firebase:deploy": "npm run build && firebase deploy",
    "firebase:functions": "firebase deploy --only functions",
    "firebase:hosting": "firebase deploy --only hosting",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
  },
  "dependencies": {
    "firebase": "^10.7.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "@google-cloud/bigquery": "^7.3.0",
    "@google-cloud/dialogflow": "^7.2.0",
    "@google-cloud/kms": "^4.1.0",
    "@google-cloud/pubsub": "^4.0.7",
    "@google-cloud/recaptcha-enterprise": "^5.7.0",
    "@google-cloud/speech": "^6.5.0",
    "@google-cloud/tasks": "^5.3.0",
    "@google-cloud/translate": "^8.3.0",
    "@google-cloud/vision": "^4.0.2",
    "@googlemaps/js-api-loader": "^1.16.2",
    "axios": "^1.6.5",
    "mysql2": "^3.6.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/node": "^20.10.6",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "prettier": "^3.1.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.1.0"
  },
  "keywords": [
    "firebase",
    "cars",
    "marketplace",
    "bulgaria",
    "react",
    "typescript"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

---

## 🔥 Working with Firebase Emulators

### **Running Emulators for Development:**

```bash
# Run all emulators
firebase emulators:start

# Run specific emulators only
firebase emulators:start --only auth,firestore,storage

# Run with saved data
firebase emulators:start --import=./emulator-data

# Save emulator data
firebase emulators:export ./emulator-data
```

### **Local Emulator Links:**

- **Emulator UI**: http://localhost:4000
- **Authentication**: http://localhost:9099
- **Firestore**: http://localhost:8080
- **Storage**: http://localhost:9199
- **Functions**: http://localhost:5001
- **Hosting**: http://localhost:5000

---

## 🎯 Next Steps After Setup

### **1. Test Connection:**

```typescript
// test-connection.ts
import { app, auth, db } from './src/services/firebase-config';

console.log('Firebase App:', app.name);
console.log('Auth instance:', auth.app.name);
console.log('Firestore instance:', db.app.name);
console.log('✅ Firebase connection successful!');
```

### **2. Create First Test User:**

```bash
# In Firebase Console → Authentication → Users
# Add test user:
# Email: test@globulcars.bg
# Password: Test123456
```

### **3. Run the Project:**

```bash
# Terminal 1: Run Firebase Emulators
firebase emulators:start

# Terminal 2: Run the Application
npm run dev

# Open browser at: http://localhost:5173
```

---

## 🛠️ Helpful Development Tools

### **Useful VS Code Extensions:**

```json
{
  "recommendations": [
    "firebase.firebase-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### **VS Code Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

---

## 🚨 Troubleshooting

### **Common Issues and Solutions:**

#### **1. Firebase Keys Error:**
```bash
❌ Firebase: Error (auth/invalid-api-key)
✅ Solution: Ensure VITE_FIREBASE_API_KEY is correct in .env file
```

#### **2. Emulators Connection Error:**
```bash
❌ Connection refused to localhost:9099
✅ Solution: Make sure firebase emulators:start is running
```

#### **3. Firestore Rules Error:**
```bash
❌ Permission denied
✅ Solution: Review firestore.rules and ensure rules are correct
```

#### **4. Dependencies Installation Error:**
```bash
❌ npm ERR! peer dep missing
✅ Solution: npm install --legacy-peer-deps
```

---

## 📞 Support and Help

### **Useful Resources:**

- **Firebase Documentation**: https://firebase.google.com/docs
- **React Firebase Hooks**: https://github.com/CSFrequency/react-firebase-hooks
- **TypeScript Firebase Guide**: https://firebase.google.com/docs/web/setup#available-libraries
- **Firestore Security Rules**: https://firebase.google.com/docs/firestore/security/get-started

### **Emergency Commands:**

```bash
# Reinstall Dependencies
rm -rf node_modules package-lock.json
npm install

# Clean Firebase Cache
firebase setup:emulators:database
firebase setup:emulators:firestore

# Reinitialize Firebase
firebase logout
firebase login
firebase use --add
```

---

**🎉 Congratulations! Development environment is ready now**

**Next Step: Start developing `firebase-config.ts`**

```bash
# Open the file in VS Code
code src/services/firebase-config.ts

# Start coding!
```