// src/hooks/useNotifications.ts
// Custom Hook for Push Notifications Management

import { useState, useEffect } from 'react';
import { fcmService, PushNotification } from '../services/fcm-service';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize FCM service
  useEffect(() => {
    const initializeFCM = async () => {
      try {
        const token = await fcmService.initialize();
        if (token) {
          console.log('FCM initialized successfully');
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize FCM:', error);
        setIsInitialized(true); // Still mark as initialized to avoid infinite loading
      }
    };

    initializeFCM();
  }, []);

  // Load notifications and subscribe to updates
  useEffect(() => {
    if (!isInitialized) return;

    // Load initial notifications
    setNotifications(fcmService.getNotifications());
    setUnreadCount(fcmService.getUnreadCount());

    // Subscribe to notification updates
    const unsubscribe = fcmService.subscribe((notification) => {
      setNotifications(fcmService.getNotifications());
      setUnreadCount(fcmService.getUnreadCount());
    });

    return unsubscribe;
  }, [isInitialized]);

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    fcmService.markAsRead(notificationId);
    setNotifications(fcmService.getNotifications());
    setUnreadCount(fcmService.getUnreadCount());
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    fcmService.markAllAsRead();
    setNotifications(fcmService.getNotifications());
    setUnreadCount(fcmService.getUnreadCount());
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    fcmService.clearNotifications();
    setNotifications([]);
    setUnreadCount(0);
  };

  // Send test notification (for development)
  const sendTestNotification = () => {
    fcmService.sendTestNotification();
  };

  return {
    notifications,
    unreadCount,
    isInitialized,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    sendTestNotification
  };
};

export default useNotifications;