// src/services/fcm-service.ts
// Firebase Cloud Messaging Service for Push Notifications
// Firebase Cloud Messaging service for notifications

import {
  getMessaging,
  getToken,
  onMessage,
  MessagePayload,
  Messaging
} from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { BULGARIAN_CONFIG } from '../config/bulgarian-config';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || BULGARIAN_CONFIG.api.firebase.apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || BULGARIAN_CONFIG.api.firebase.authDomain,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || BULGARIAN_CONFIG.api.firebase.projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || BULGARIAN_CONFIG.api.firebase.storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || BULGARIAN_CONFIG.api.firebase.messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_APP_ID || BULGARIAN_CONFIG.api.firebase.appId
};

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: any;
  timestamp: Date;
  read: boolean;
  type: 'message' | 'car_update' | 'system' | 'promotion';
}

class FCMService {
  private messaging: Messaging | null = null;
  private vapidKey: string;
  private notifications: PushNotification[] = [];
  private listeners: ((notification: PushNotification) => void)[] = [];

  constructor() {
    this.vapidKey = process.env.REACT_APP_FCM_VAPID_KEY || '';
    this.initializeMessaging();
  }

  private initializeMessaging() {
    try {
      // Skip initialization in test environment or when window is not available
      if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
        console.warn('FCM initialization skipped in test environment');
        return;
      }

      // Initialize Firebase if not already initialized
      if (!this.messaging) {
        const app = initializeApp(firebaseConfig);
        this.messaging = getMessaging(app);
      }
    } catch (error) {
      console.error('Failed to initialize FCM:', error);
    }
  }

  // Request permission for notifications
  async requestPermission(): Promise<boolean> {
    try {
      // Skip in test environment
      if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
        return true;
      }

      if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return false;
      }

      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        console.log('Notification permission granted');
        return true;
      } else {
        console.log('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Get FCM token
  async getFCMToken(): Promise<string | null> {
    try {
      if (!this.messaging) {
        console.error('FCM not initialized');
        return null;
      }

      if (!this.vapidKey) {
        console.error('VAPID key not configured');
        return null;
      }

      const token = await getToken(this.messaging, {
        vapidKey: this.vapidKey
      });

      if (token) {
        console.log('FCM token obtained:', token);
        return token;
      } else {
        console.log('No FCM token available');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  // Listen for incoming messages
  setupMessageListener() {
    if (!this.messaging) {
      console.error('FCM not initialized');
      return;
    }

    onMessage(this.messaging, (payload: MessagePayload) => {
      console.log('Message received:', payload);

      const notification: PushNotification = {
        id: payload.messageId || Date.now().toString(),
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || '',
        data: payload.data,
        timestamp: new Date(),
        read: false,
        type: this.getNotificationType(payload.data)
      };

      this.addNotification(notification);
      this.showBrowserNotification(notification);
    });
  }

  // Show browser notification
  private showBrowserNotification(notification: PushNotification) {
    if (Notification.permission === 'granted') {
      const options: NotificationOptions = {
        body: notification.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id,
        requireInteraction: false,
        data: notification.data
      };

      const browserNotification = new Notification(notification.title, options);

      browserNotification.onclick = () => {
        // Handle notification click
        this.handleNotificationClick(notification);
        browserNotification.close();
      };

      // Auto close after 5 seconds
      setTimeout(() => {
        browserNotification.close();
      }, 5000);
    }
  }

  // Handle notification click
  private handleNotificationClick(notification: PushNotification) {
    // Mark as read
    this.markAsRead(notification.id);

    // Navigate based on notification type
    switch (notification.type) {
      case 'message':
        window.location.href = '/messages';
        break;
      case 'car_update':
        if (notification.data?.carId) {
          window.location.href = `/cars/${notification.data.carId}`;
        }
        break;
      default:
        window.location.href = '/';
    }
  }

  // Determine notification type from data
  private getNotificationType(data?: any): PushNotification['type'] {
    if (!data) return 'system';

    if (data.type) {
      return data.type as PushNotification['type'];
    }

    if (data.messageId) return 'message';
    if (data.carId) return 'car_update';

    return 'system';
  }

  // Add notification to local storage
  private addNotification(notification: PushNotification) {
    this.notifications.unshift(notification);

    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }

    // Save to localStorage
    this.saveNotifications();

    // Notify listeners
    this.listeners.forEach(listener => listener(notification));
  }

  // Mark notification as read
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.saveNotifications();
  }

  // Get all notifications
  getNotifications(): PushNotification[] {
    return [...this.notifications];
  }

  // Get unread count
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Clear all notifications
  clearNotifications() {
    this.notifications = [];
    this.saveNotifications();
  }

  // Save notifications to localStorage
  private saveNotifications() {
    try {
      localStorage.setItem('globul-cars-notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  // Load notifications from localStorage
  loadNotifications() {
    try {
      const saved = localStorage.getItem('globul-cars-notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  // Subscribe to notification updates
  subscribe(listener: (notification: PushNotification) => void) {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Send test notification (for development)
  async sendTestNotification() {
    const testNotification: PushNotification = {
      id: Date.now().toString(),
      title: 'Test Notification',
      body: 'This is a test push notification',
      timestamp: new Date(),
      read: false,
      type: 'system'
    };

    this.addNotification(testNotification);
    this.showBrowserNotification(testNotification);
  }

  // Initialize service
  async initialize() {
    this.loadNotifications();

    const hasPermission = await this.requestPermission();
    if (hasPermission) {
      const token = await this.getFCMToken();
      if (token) {
        this.setupMessageListener();
        return token;
      }
    }

    return null;
  }
}

// Export singleton instance
export const fcmService = new FCMService();
export default fcmService;