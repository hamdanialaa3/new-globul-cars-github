# Bulgarian Car Marketplace - Deployment Guide

## 🚀 Production Deployment

This guide will help you deploy the Bulgarian Car Marketplace to production using Firebase Hosting.

### Prerequisites

1. **Firebase Account**: You need a Firebase account and project
2. **Firebase CLI**: Install Firebase CLI globally
   ```bash
   npm install -g firebase-tools
   ```

3. **Project Setup**: Make sure you have the correct Firebase project ID in `.firebaserc`

### Environment Variables

Create a `.env.production` file with your production Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Deployment Steps

#### 1. Login to Firebase
```bash
firebase login
```

#### 2. Initialize Firebase (if not done already)
```bash
firebase init
```
Select:
- Hosting
- Use existing project
- Select your project
- Public directory: `build`
- Configure as single-page app: Yes
- Automatic builds and deploys: No

#### 3. Build the Application
```bash
npm run build
```

#### 4. Deploy to Production
```bash
npm run deploy
```

Or deploy only hosting:
```bash
npm run deploy:hosting
```

### Firebase Configuration

The project is configured with:
- **Hosting**: Single-page application with client-side routing
- **Caching**: Optimized caching headers for static assets
- **Rewrites**: All routes redirect to index.html for SPA routing

### Custom Domain (Optional)

To use a custom domain:

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the instructions to add your domain
4. Update DNS records as instructed

### Environment-Specific Builds

For different environments, you can create multiple Firebase projects:

```bash
# Development
firebase use dev
npm run deploy

# Staging
firebase use staging
npm run deploy

# Production
firebase use prod
npm run deploy
```

### Monitoring and Analytics

After deployment:
1. Enable Google Analytics in Firebase Console
2. Set up Crashlytics for error monitoring
3. Configure Performance Monitoring

### Troubleshooting

#### Build Issues
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify environment variables are set correctly

#### Deployment Issues
- Check Firebase project permissions
- Verify `.firebaserc` has correct project ID
- Ensure Firebase CLI is logged in: `firebase login`

#### Runtime Issues
- Check browser console for JavaScript errors
- Verify Firebase configuration is correct
- Check Firestore Security Rules if data isn't loading

### Performance Optimization

The deployment includes:
- Code splitting with React.lazy()
- Optimized bundle sizes
- Efficient caching headers
- CDN delivery through Firebase Hosting

### Security Checklist

Before going live:
- ✅ Environment variables are production-ready
- ✅ Firebase Security Rules are configured
- ✅ Admin routes are protected
- ✅ HTTPS is enabled (automatic with Firebase)
- ✅ CORS is properly configured

### Support

For deployment issues:
1. Check Firebase documentation: https://firebase.google.com/docs/hosting
2. Review build logs for errors
3. Test locally with `npm run serve` before deploying