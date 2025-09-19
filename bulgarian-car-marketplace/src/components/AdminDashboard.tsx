// src/components/AdminDashboard.tsx
// Admin Dashboard Component for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

interface User {
  id: string;
  email: string;
  displayName: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLogin?: Date;
}

interface Car {
  id: string;
  title: string;
  price: number;
  status: 'active' | 'sold' | 'pending';
  sellerId: string;
  createdAt: Date;
  location: string;
}

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.default};
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1.1rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey[200]};
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary.main : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary.main : props.theme.colors.text.secondary};
  font-size: 1.1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1rem;
  }
`;

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  }

  th {
    background: ${({ theme }) => theme.colors.grey[50]};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  tr:hover {
    background: ${({ theme }) => theme.colors.grey[50]};
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;

  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: #4caf50;
          color: white;
        `;
      case 'inactive':
        return `
          background: #ff9800;
          color: white;
        `;
      case 'suspended':
        return `
          background: #f44336;
          color: white;
        `;
      case 'sold':
        return `
          background: #2196f3;
          color: white;
        `;
      case 'pending':
        return `
          background: #ffeb3b;
          color: black;
        `;
      default:
        return `
          background: #9e9e9e;
          color: white;
        `;
    }
  }}
`;

const ActionButton = styled.button<{ variant: 'primary' | 'danger' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: all 0.2s ease;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${props.theme.colors.primary.main};
          color: white;
          &:hover {
            background: ${props.theme.colors.primary.dark};
          }
        `;
      case 'danger':
        return `
          background: ${props.theme.colors.error.main};
          color: white;
          &:hover {
            background: ${props.theme.colors.error.dark};
          }
        `;
      case 'secondary':
        return `
          background: ${props.theme.colors.grey[300]};
          color: ${props.theme.colors.text.primary};
          &:hover {
            background: ${props.theme.colors.grey[400]};
          }
        `;
    }
  }}
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'cars' | 'analytics'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load users
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const usersSnapshot = await getDocs(usersQuery);
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        lastLogin: doc.data().lastLogin?.toDate(),
      })) as User[];
      setUsers(usersData);

      // Load cars
      const carsQuery = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
      const carsSnapshot = await getDocs(carsQuery);
      const carsData = carsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Car[];
      setCars(carsData);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: User['status']) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status });
      setUsers(users.map(u => u.id === userId ? { ...u, status } : u));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този потребител?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const updateCarStatus = async (carId: string, status: Car['status']) => {
    try {
      await updateDoc(doc(db, 'cars', carId), { status });
      setCars(cars.map(c => c.id === carId ? { ...c, status } : c));
    } catch (error) {
      console.error('Error updating car status:', error);
    }
  };

  const deleteCar = async (carId: string) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете тази обява?')) {
      try {
        await deleteDoc(doc(db, 'cars', carId));
        setCars(cars.filter(c => c.id !== carId));
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'BGN'
    }).format(price);
  };

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <LoadingSpinner />
          <p style={{ marginTop: '1rem' }}>Зареждане...</p>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <h1>Админ Панел</h1>
        <p>Добре дошли, {user?.displayName || user?.email}</p>
      </Header>

      <TabsContainer>
        <Tab active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
          Потребители ({users.length})
        </Tab>
        <Tab active={activeTab === 'cars'} onClick={() => setActiveTab('cars')}>
          Автомобили ({cars.length})
        </Tab>
        <Tab active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>
          Анализ
        </Tab>
      </TabsContainer>

      {activeTab === 'users' && (
        <>
          <StatsGrid>
            <StatCard>
              <h3>{users.length}</h3>
              <p>Общо потребители</p>
            </StatCard>
            <StatCard>
              <h3>{users.filter(u => u.status === 'active').length}</h3>
              <p>Активни потребители</p>
            </StatCard>
            <StatCard>
              <h3>{users.filter(u => u.status === 'suspended').length}</h3>
              <p>Блокирани потребители</p>
            </StatCard>
            <StatCard>
              <h3>{users.filter(u => u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</h3>
              <p>Активни тази седмица</p>
            </StatCard>
          </StatsGrid>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Име</th>
                  <th>Имейл</th>
                  <th>Статус</th>
                  <th>Регистриран</th>
                  <th>Последно влизане</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.displayName || 'Няма име'}</td>
                    <td>{user.email}</td>
                    <td>
                      <StatusBadge status={user.status}>{user.status}</StatusBadge>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{user.lastLogin ? formatDate(user.lastLogin) : 'Никога'}</td>
                    <td>
                      <ActionButton
                        variant="secondary"
                        onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                      >
                        {user.status === 'active' ? 'Деактивирай' : 'Активирай'}
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        onClick={() => updateUserStatus(user.id, 'suspended')}
                      >
                        Блокирай
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        Изтрий
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </>
      )}

      {activeTab === 'cars' && (
        <>
          <StatsGrid>
            <StatCard>
              <h3>{cars.length}</h3>
              <p>Общо обяви</p>
            </StatCard>
            <StatCard>
              <h3>{cars.filter(c => c.status === 'active').length}</h3>
              <p>Активни обяви</p>
            </StatCard>
            <StatCard>
              <h3>{cars.filter(c => c.status === 'sold').length}</h3>
              <p>Продадени</p>
            </StatCard>
            <StatCard>
              <h3>{cars.filter(c => c.status === 'pending').length}</h3>
              <p>Чакащи одобрение</p>
            </StatCard>
          </StatsGrid>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Заглавие</th>
                  <th>Цена</th>
                  <th>Статус</th>
                  <th>Продавач</th>
                  <th>Локация</th>
                  <th>Създадена</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id}>
                    <td>{car.title}</td>
                    <td>{formatPrice(car.price)}</td>
                    <td>
                      <StatusBadge status={car.status}>{car.status}</StatusBadge>
                    </td>
                    <td>{car.sellerId}</td>
                    <td>{car.location}</td>
                    <td>{formatDate(car.createdAt)}</td>
                    <td>
                      <ActionButton
                        variant="primary"
                        onClick={() => updateCarStatus(car.id, 'active')}
                      >
                        Одобри
                      </ActionButton>
                      <ActionButton
                        variant="secondary"
                        onClick={() => updateCarStatus(car.id, 'sold')}
                      >
                        Продадена
                      </ActionButton>
                      <ActionButton
                        variant="danger"
                        onClick={() => deleteCar(car.id)}
                      >
                        Изтрий
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </>
      )}

      {activeTab === 'analytics' && (
        <StatsGrid>
          <StatCard>
            <h3>{users.length}</h3>
            <p>Регистрирани потребители</p>
          </StatCard>
          <StatCard>
            <h3>{cars.length}</h3>
            <p>Обяви за продажба</p>
          </StatCard>
          <StatCard>
            <h3>{cars.filter(c => c.status === 'sold').length}</h3>
            <p>Успешни продажби</p>
          </StatCard>
          <StatCard>
            <h3>
              {cars.length > 0
                ? Math.round((cars.filter(c => c.status === 'sold').length / cars.length) * 100)
                : 0}%
            </h3>
            <p>Процент успешни продажби</p>
          </StatCard>
        </StatsGrid>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;