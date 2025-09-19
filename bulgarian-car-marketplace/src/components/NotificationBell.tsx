// src/components/NotificationBell.tsx
// Notification Bell Component for Push Notifications

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { fcmService, PushNotification } from '../services/fcm-service';

const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const NotificationButton = styled.button<{ hasUnread: boolean }>`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  .bell-icon {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme, hasUnread }) =>
      hasUnread ? theme.colors.primary.main : theme.colors.text.secondary};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${({ theme }) => theme.colors.error.main};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.background.paper};
`;

const NotificationDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 350px;
  max-width: 400px;
  max-height: 500px;
  overflow: hidden;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: all 0.2s ease-in-out;
`;

const NotificationHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    text-decoration: underline;
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[100]};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey[400]};
    border-radius: 3px;
  }
`;

const NotificationItem = styled.div<{ read: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background: ${({ theme, read }) =>
    read ? 'transparent' : theme.colors.primary.light}10;

  &:hover {
    background: ${({ theme }) => theme.colors.grey[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NotificationBody = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyNotifications = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const NotificationBell: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications on mount
  useEffect(() => {
    setNotifications(fcmService.getNotifications());
    setUnreadCount(fcmService.getUnreadCount());

    // Subscribe to notification updates
    const unsubscribe = fcmService.subscribe((notification) => {
      setNotifications(fcmService.getNotifications());
      setUnreadCount(fcmService.getUnreadCount());
    });

    return unsubscribe;
  }, []);

  // Handle notification click
  const handleNotificationClick = (notification: PushNotification) => {
    fcmService.markAsRead(notification.id);
    setNotifications(fcmService.getNotifications());
    setUnreadCount(fcmService.getUnreadCount());
    setIsOpen(false);

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
        // Stay on current page
        break;
    }
  };

  // Clear all notifications
  const handleClearAll = () => {
    fcmService.clearNotifications();
    setNotifications([]);
    setUnreadCount(0);
  };

  // Format notification time
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return t('common.now');
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.notification-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <NotificationContainer className="notification-container">
      <NotificationButton
        onClick={toggleDropdown}
        hasUnread={unreadCount > 0}
        aria-label={t('notifications.title')}
      >
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <NotificationBadge>
            {unreadCount > 99 ? '99+' : unreadCount}
          </NotificationBadge>
        )}
      </NotificationButton>

      <NotificationDropdown isOpen={isOpen}>
        <NotificationHeader>
          <h3>{t('notifications.title')}</h3>
          {notifications.length > 0 && (
            <ClearButton onClick={handleClearAll}>
              {t('notifications.clearAll')}
            </ClearButton>
          )}
        </NotificationHeader>

        <NotificationList>
          {notifications.length === 0 ? (
            <EmptyNotifications>
              <div className="icon">🔔</div>
              <p>{t('notifications.noNotifications')}</p>
            </EmptyNotifications>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                read={notification.read}
                onClick={() => handleNotificationClick(notification)}
              >
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationBody>{notification.body}</NotificationBody>
                <NotificationTime>
                  {formatTime(notification.timestamp)}
                </NotificationTime>
              </NotificationItem>
            ))
          )}
        </NotificationList>
      </NotificationDropdown>
    </NotificationContainer>
  );
};

export default NotificationBell;