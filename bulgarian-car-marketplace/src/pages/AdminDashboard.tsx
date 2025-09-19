// src/pages/AdminDashboard.tsx
// Admin Dashboard Page for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.md} 0 0 0;
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
`;

const StatTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatChange = styled.div<{ positive?: boolean }>`
  font-size: 0.9rem;
  color: ${({ positive, theme }) =>
    positive ? '#4caf50' : '#f44336'};
  font-weight: 500;
`;

const TabsContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[300]};
`;

const TabButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ active, theme }) =>
    active ? theme.colors.primary.main : 'transparent'};
  color: ${({ active, theme }) =>
    active ? '#ffffff' : theme.colors.text.primary};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.primary.main : '#f5f5f5'};
  }
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.default};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey[300]};
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[300]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' | 'success' }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease;

  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'danger':
        return theme.colors.error.main;
      case 'success':
        return '#4caf50';
      default:
        return theme.colors.primary.main;
    }
  }};

  color: #ffffff;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusBadge = styled.span<{ status: 'active' | 'inactive' | 'pending' | 'suspended' | 'success' | 'sold' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;

  background: ${({ status, theme }) => {
    switch (status) {
      case 'active':
        return theme.colors.success.light;
      case 'success':
      case 'sold':
        return '#4caf50';
      case 'inactive':
        return theme.colors.warning.light;
      case 'pending':
        return theme.colors.info.light;
      case 'suspended':
        return theme.colors.error.light;
      default:
        return theme.colors.grey[300];
    }
  }};

  color: ${({ status, theme }) => {
    switch (status) {
      case 'active':
        return theme.colors.success.dark;
      case 'success':
      case 'sold':
        return '#ffffff';
      case 'inactive':
        return theme.colors.warning.dark;
      case 'pending':
        return theme.colors.info.dark;
      case 'suspended':
        return theme.colors.error.dark;
      default:
        return theme.colors.grey[700];
    }
  }};
`;

interface User {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLogin?: Date;
}

interface Car {
  id: string;
  title: string;
  price: number;
  userId: string;
  userName: string;
  status: 'active' | 'sold' | 'pending';
  createdAt: Date;
  views: number;
}

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'users' | 'cars' | 'analytics'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    activeListings: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        lastLogin: doc.data().lastLogin?.toDate()
      })) as User[];
      setUsers(usersData);

      // Load cars
      const carsSnapshot = await getDocs(collection(db, 'cars'));
      const carsData = carsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Car[];
      setCars(carsData);

      // Calculate stats
      setStats({
        totalUsers: usersData.length,
        totalCars: carsData.length,
        activeListings: carsData.filter(car => car.status === 'active').length,
        totalRevenue: carsData.filter(car => car.status === 'sold').length * 100 // Mock revenue calculation
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusChange = async (userId: string, newStatus: User['status']) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      setUsers(users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleCarStatusChange = async (carId: string, newStatus: Car['status']) => {
    try {
      await updateDoc(doc(db, 'cars', carId), { status: newStatus });
      setCars(cars.map(car =>
        car.id === carId ? { ...car, status: newStatus } : car
      ));
    } catch (error) {
      console.error('Error updating car status:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm(t('admin.confirmDeleteUser'))) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeleteCar = async (carId: string) => {
    if (window.confirm(t('admin.confirmDeleteCar'))) {
      try {
        await deleteDoc(doc(db, 'cars', carId));
        setCars(cars.filter(car => car.id !== carId));
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const getCarStatusBadge = (status: Car['status']) => {
    switch (status) {
      case 'active':
        return 'active';
      case 'sold':
        return 'success';
      case 'pending':
        return 'pending';
      default:
        return 'pending';
    }
  };

  if (loading) {
    return (
      <AdminContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          {t('common.loading')}
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <Header>
        <Title>{t('admin.dashboard')}</Title>
        <Subtitle>{t('admin.welcomeMessage')}</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatTitle>{t('admin.totalUsers')}</StatTitle>
          <StatValue>{stats.totalUsers}</StatValue>
          <StatChange positive>+12%</StatChange>
        </StatCard>

        <StatCard>
          <StatTitle>{t('admin.totalCars')}</StatTitle>
          <StatValue>{stats.totalCars}</StatValue>
          <StatChange positive>+8%</StatChange>
        </StatCard>

        <StatCard>
          <StatTitle>{t('admin.activeListings')}</StatTitle>
          <StatValue>{stats.activeListings}</StatValue>
          <StatChange positive>+15%</StatChange>
        </StatCard>

        <StatCard>
          <StatTitle>{t('admin.totalRevenue')}</StatTitle>
          <StatValue>{stats.totalRevenue} лв</StatValue>
          <StatChange positive>+22%</StatChange>
        </StatCard>
      </StatsGrid>

      <TabsContainer>
        <TabButtons>
          <TabButton
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          >
            {t('admin.users')}
          </TabButton>
          <TabButton
            active={activeTab === 'cars'}
            onClick={() => setActiveTab('cars')}
          >
            {t('admin.cars')}
          </TabButton>
          <TabButton
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          >
            {t('admin.analytics')}
          </TabButton>
        </TabButtons>

        <TabContent>
          {activeTab === 'users' && (
            <div>
              <h2>{t('admin.userManagement')}</h2>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>{t('admin.name')}</TableHeader>
                    <TableHeader>{t('admin.email')}</TableHeader>
                    <TableHeader>{t('admin.phone')}</TableHeader>
                    <TableHeader>{t('admin.status')}</TableHeader>
                    <TableHeader>{t('admin.role')}</TableHeader>
                    <TableHeader>{t('admin.createdAt')}</TableHeader>
                    <TableHeader>{t('admin.actions')}</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <TableCell>{user.displayName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.status}>
                          {t(`admin.status.${user.status}`)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{t(`admin.role.${user.role}`)}</TableCell>
                      <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <ActionButton
                          variant="success"
                          onClick={() => handleUserStatusChange(user.id, 'active')}
                          disabled={user.status === 'active'}
                        >
                          {t('admin.activate')}
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => handleUserStatusChange(user.id, 'suspended')}
                          disabled={user.status === 'suspended'}
                        >
                          {t('admin.suspend')}
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          {t('admin.delete')}
                        </ActionButton>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {activeTab === 'cars' && (
            <div>
              <h2>{t('admin.carManagement')}</h2>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>{t('admin.title')}</TableHeader>
                    <TableHeader>{t('admin.price')}</TableHeader>
                    <TableHeader>{t('admin.seller')}</TableHeader>
                    <TableHeader>{t('admin.status')}</TableHeader>
                    <TableHeader>{t('admin.views')}</TableHeader>
                    <TableHeader>{t('admin.createdAt')}</TableHeader>
                    <TableHeader>{t('admin.actions')}</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {cars.map(car => (
                    <tr key={car.id}>
                      <TableCell>{car.title}</TableCell>
                      <TableCell>{car.price} лв</TableCell>
                      <TableCell>{car.userName}</TableCell>
                      <TableCell>
                        <StatusBadge status={getCarStatusBadge(car.status)}>
                          {t(`admin.carStatus.${car.status}`)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{car.views}</TableCell>
                      <TableCell>{car.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <ActionButton
                          variant="success"
                          onClick={() => handleCarStatusChange(car.id, 'active')}
                          disabled={car.status === 'active'}
                        >
                          {t('admin.approve')}
                        </ActionButton>
                        <ActionButton
                          variant="primary"
                          onClick={() => handleCarStatusChange(car.id, 'sold')}
                          disabled={car.status === 'sold'}
                        >
                          {t('admin.markSold')}
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => handleDeleteCar(car.id)}
                        >
                          {t('admin.delete')}
                        </ActionButton>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2>{t('admin.analytics')}</h2>
              <p>{t('admin.analyticsComingSoon')}</p>
              {/* Analytics components will be added here */}
            </div>
          )}
        </TabContent>
      </TabsContainer>
    </AdminContainer>
  );
};

export default AdminDashboard;