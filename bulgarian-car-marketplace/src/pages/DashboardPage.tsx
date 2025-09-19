// src/pages/DashboardPage.tsx
// User Dashboard Page for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { useNotifications } from '../hooks/useNotifications';
import { bulgarianAuthService } from '../firebase';
import { BulgarianUser } from '../firebase/auth-service';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const DashboardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h1 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const DashboardCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.base};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  background: ${({ theme }) => theme.colors.grey[50]};

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.primary.light}10;
  border: 1px solid ${({ theme }) => theme.colors.primary.light}30;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;

  .stat-number {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .stat-label {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

const RecentActivity = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }

  .activity-icon {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    width: 40px;
    text-align: center;
  }

  .activity-content {
    flex: 1;

    h4 {
      margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
      color: ${({ theme }) => theme.colors.text.primary};
    }

    p {
      margin: 0;
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  .activity-time {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const QuickActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light}10;
    border-color: ${({ theme }) => theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  .action-icon {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .action-title {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }

  .action-description {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    text-align: center;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};

  .empty-icon {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    opacity: 0.5;
  }

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { notifications } = useNotifications();
  const [user, setUser] = useState<BulgarianUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockStats = {
    totalCars: 12,
    activeListings: 8,
    totalViews: 245,
    messagesReceived: 15
  };

  const mockRecentActivity = [
    {
      id: '1',
      type: 'message',
      title: 'New message from Иван',
      description: 'Interested in your BMW X5',
      time: '2 hours ago',
      icon: '💬'
    },
    {
      id: '2',
      type: 'view',
      title: 'Car viewed',
      description: 'Your Audi A4 was viewed 5 times',
      time: '4 hours ago',
      icon: '👁️'
    },
    {
      id: '3',
      type: 'favorite',
      title: 'Added to favorites',
      description: 'Someone favorited your Mercedes C-Class',
      time: '1 day ago',
      icon: '❤️'
    }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await bulgarianAuthService.getCurrentUserProfile();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-car':
        window.location.href = '/sell-car';
        break;
      case 'messages':
        window.location.href = '/messages';
        break;
      case 'favorites':
        window.location.href = '/favorites';
        break;
      case 'profile':
        window.location.href = '/profile';
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="loading-spinner" />
          <p>{t('common.loading')}</p>
        </div>
      </DashboardContainer>
    );
  }

  if (!user) {
    return (
      <DashboardContainer>
        <EmptyState>
          <div className="empty-icon">🔒</div>
          <h3>{t('auth.loginTitle')}</h3>
          <p>Please log in to access your dashboard</p>
        </EmptyState>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>{t('dashboard.welcome')}, {user.displayName}!</h1>
        <p>{t('dashboard.subtitle')}</p>
      </DashboardHeader>

      <DashboardGrid>
        {/* Statistics */}
        <DashboardCard>
          <CardHeader>
            <h2>{t('dashboard.statistics')}</h2>
          </CardHeader>
          <CardContent>
            <StatsGrid>
              <StatCard>
                <div className="stat-number">{mockStats.totalCars}</div>
                <p className="stat-label">{t('dashboard.totalCars')}</p>
              </StatCard>
              <StatCard>
                <div className="stat-number">{mockStats.activeListings}</div>
                <p className="stat-label">{t('dashboard.activeListings')}</p>
              </StatCard>
              <StatCard>
                <div className="stat-number">{mockStats.totalViews}</div>
                <p className="stat-label">{t('dashboard.totalViews')}</p>
              </StatCard>
              <StatCard>
                <div className="stat-number">{mockStats.messagesReceived}</div>
                <p className="stat-label">{t('dashboard.messagesReceived')}</p>
              </StatCard>
            </StatsGrid>
          </CardContent>
        </DashboardCard>

        {/* Recent Activity */}
        <DashboardCard>
          <CardHeader>
            <h2>{t('dashboard.recentActivity')}</h2>
          </CardHeader>
          <CardContent>
            <RecentActivity>
              {mockRecentActivity.map((activity) => (
                <ActivityItem key={activity.id}>
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </ActivityItem>
              ))}
            </RecentActivity>
          </CardContent>
        </DashboardCard>

        {/* Quick Actions */}
        <DashboardCard>
          <CardHeader>
            <h2>{t('dashboard.quickActions')}</h2>
          </CardHeader>
          <CardContent>
            <QuickActions>
              <QuickActionButton onClick={() => handleQuickAction('add-car')}>
                <div className="action-icon">➕</div>
                <h3 className="action-title">{t('dashboard.addCar')}</h3>
                <p className="action-description">{t('dashboard.addCarDesc')}</p>
              </QuickActionButton>
              <QuickActionButton onClick={() => handleQuickAction('messages')}>
                <div className="action-icon">💬</div>
                <h3 className="action-title">{t('nav.messages')}</h3>
                <p className="action-description">{t('dashboard.messagesDesc')}</p>
              </QuickActionButton>
              <QuickActionButton onClick={() => handleQuickAction('favorites')}>
                <div className="action-icon">❤️</div>
                <h3 className="action-title">{t('nav.favorites')}</h3>
                <p className="action-description">{t('dashboard.favoritesDesc')}</p>
              </QuickActionButton>
              <QuickActionButton onClick={() => handleQuickAction('profile')}>
                <div className="action-icon">👤</div>
                <h3 className="action-title">{t('nav.profile')}</h3>
                <p className="action-description">{t('dashboard.profileDesc')}</p>
              </QuickActionButton>
            </QuickActions>
          </CardContent>
        </DashboardCard>

        {/* Notifications */}
        <DashboardCard>
          <CardHeader>
            <h2>{t('notifications.title')}</h2>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <EmptyState>
                <div className="empty-icon">🔔</div>
                <h3>{t('notifications.noNotifications')}</h3>
                <p>{t('dashboard.noNotificationsDesc')}</p>
              </EmptyState>
            ) : (
              <div>
                {notifications.slice(0, 5).map((notification) => (
                  <ActivityItem key={notification.id}>
                    <div className="activity-icon">🔔</div>
                    <div className="activity-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.body}</p>
                    </div>
                    <div className="activity-time">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </div>
                  </ActivityItem>
                ))}
                {notifications.length > 5 && (
                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#00966B',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                      onClick={() => window.location.href = '/messages'}
                    >
                      {t('dashboard.viewAllNotifications')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </DashboardCard>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default DashboardPage;