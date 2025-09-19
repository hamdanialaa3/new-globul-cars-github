# Globul Cars - Bulgarian Car Marketplace PWA

## 🌟 Overview
Globul Cars is a modern, progressive web application for buying and selling cars in Bulgaria. Built with React, TypeScript, and Firebase, featuring real-time messaging, push notifications, and full PWA capabilities.

## ✨ Features

### 🚗 Core Features
- **Car Listings**: Browse, search, and filter cars with detailed specifications
- **Real-time Messaging**: Chat with sellers using Firebase-powered messaging system
- **User Dashboard**: Comprehensive dashboard with statistics and activity tracking
- **Push Notifications**: Instant notifications for new messages and updates
- **Bulgarian Localization**: Full Bulgarian and English language support

### �‍💼 Admin Panel
- **User Management**: View, edit, suspend, or delete user accounts
- **Car Moderation**: Approve/reject listings, manage car status
- **Analytics Dashboard**: Real-time statistics and insights
- **System Monitoring**: Performance metrics and error tracking

### 📊 Analytics & Security
- **Firebase Analytics**: User behavior tracking and insights
- **Security Rules**: Comprehensive Firestore and Storage security
- **Role-Based Access**: Admin and user permission management
- **Rate Limiting**: Protection against abuse and spam

### �📱 PWA Features
- **Offline Support**: Access cached content and basic functionality offline
- **Installable**: Add to home screen for native app-like experience
- **Background Sync**: Sync offline actions when connection is restored
- **Push Notifications**: Receive notifications even when app is closed
- **Service Worker**: Intelligent caching and background processing

### 🔧 Technical Features
- **Firebase Integration**: Auth, Firestore, Storage, Cloud Messaging
- **TypeScript**: Full type safety and better development experience
- **Responsive Design**: Works perfectly on all devices
- **Real-time Updates**: Live data synchronization
- **Security**: Firebase authentication and data validation

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **React Context** - State management

### Backend & Services
- **Firebase**:
  - Authentication (Google, Facebook login)
  - Firestore (Real-time database)
  - Storage (File uploads)
  - Cloud Messaging (Push notifications)
  - Cloud Functions (Serverless backend)

### PWA & Performance
- **Service Worker** - Offline functionality and caching
- **Web App Manifest** - Installable PWA
- **Background Sync** - Offline action synchronization
- **Lazy Loading** - Optimized bundle loading

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase project with required services enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/globul-cars.git
   cd globul-cars
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication, Firestore, Storage, and Cloud Messaging
   - Copy your Firebase config to `src/firebase/config.ts`

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## � Deployment

### Firebase Hosting Setup
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init
   ```

4. **Deploy Security Rules**
   ```bash
   firebase deploy --only firestore:rules,storage
   ```

5. **Deploy Application**
   ```bash
   npm run deploy
   ```

### Environment Variables
Create `.env` file with your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_ADMIN_EMAILS=admin@globulcars.bg,your-admin@example.com
```

## 🔐 Security

### Firestore Security Rules
- User data protection with role-based access
- Car listing validation and ownership verification
- Message security for participants only
- Admin access control for system management
- Rate limiting to prevent abuse

### Storage Security Rules
- File type validation (images, documents)
- Size restrictions and upload limits
- Access permissions based on ownership
- Path-based security for different file types

## 📊 Analytics

### Tracked Events
- Page views and user navigation
- Authentication events (login/register)
- Car interactions (view, search, contact)
- Message activity and engagement
- Business metrics and conversions

### Admin Dashboard Access
- Visit `/admin` to access the admin panel
- Requires admin email authentication
- Configure admin emails in environment variables

## �📱 PWA Installation

### Browser Installation
1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Click the install prompt when it appears
3. Or use the browser menu: "Install Globul Cars"

### Manual Installation
- **Chrome**: Click the install icon in the address bar
- **Edge**: Click "Apps" > "Install this site as an app"
- **Safari**: Click "Share" > "Add to Home Screen"

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── services/           # API and service integrations
├── utils/              # Utility functions
├── locales/            # Translation files
├── styles/             # Global styles and themes
├── firebase/           # Firebase configuration
└── types/              # TypeScript type definitions

public/
├── sw.js              # Service worker
├── offline.html       # Offline fallback page
├── manifest.json      # PWA manifest
└── icons/             # App icons
```

## 🎯 Key Components

### Service Worker (`public/sw.js`)
- Handles caching strategies
- Manages push notifications
- Provides offline functionality
- Background sync for offline actions

### PWA Hook (`src/hooks/usePWA.ts`)
- Manages PWA installation
- Handles service worker lifecycle
- Monitors online/offline status
- Provides installation prompts

## 🔒 Security Features

- **Firebase Authentication**: Secure user authentication
- **Firestore Security Rules**: Data access control
- **Storage Security Rules**: File upload restrictions
- **HTTPS Only**: Secure communication
- **Input Validation**: Client and server-side validation

## 📊 Performance Optimizations

- **Code Splitting**: Lazy loading of routes and components
- **Image Optimization**: Compressed images with WebP support
- **Caching**: Intelligent service worker caching
- **Bundle Analysis**: Optimized bundle sizes
- **Progressive Loading**: Fast initial page loads

## 🌐 Browser Support

- **Chrome**: Full PWA support
- **Firefox**: PWA support (limited)
- **Safari**: PWA support on iOS 11.3+
- **Edge**: Full PWA support
- **Mobile Browsers**: Full support on modern mobile browsers

## 🚀 Deployment

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Other Platforms
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag & drop build folder or connect repo
- **AWS S3 + CloudFront**: Static hosting with CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🎉 Acknowledgments

- Firebase team for excellent documentation
- React community for amazing ecosystem
- Bulgarian developer community for localization support

---

**Made with ❤️ for Bulgarian car enthusiasts**
