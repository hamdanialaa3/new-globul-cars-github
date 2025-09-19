// Firebase Cloud Messaging (FCM) Integration for Bulgarian Car Marketplace

import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from './firebase-config';

const messaging = getMessaging(app);

export class BulgarianFCMService {
  // Request notification permission and get token
  async requestPermissionAndGetToken(vapidKey: string): Promise<string | null> {
    try {
      const token = await getToken(messaging, { vapidKey });
      return token;
    } catch (error) {
      console.error('Failed to get FCM token:', error);
      return null;
    }
  }

  // Receive notifications in foreground
  onForegroundMessage(callback: (payload: any) => void) {
    onMessage(messaging, callback);
  }
}

// Usage example
// const fcmService = new BulgarianFCMService();
// const token = await fcmService.requestPermissionAndGetToken('YOUR_VAPID_KEY');
// fcmService.onForegroundMessage((payload) => { console.log('New notification:', payload); });
