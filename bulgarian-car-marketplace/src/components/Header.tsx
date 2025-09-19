// src/components/Header.tsx
// Header Component for Bulgarian Car Marketplace
// Header component for Bulgarian Car Marketplace

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { bulgarianAuthService } from '../firebase';
import { BulgarianUser } from '../firebase/auth-service';
import NotificationBell from './NotificationBell';

// Styled Components
const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.base};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const UserEmail = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 200px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: all 0.2s ease-in-out;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[50]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  }

  &.danger {
    color: ${({ theme }) => theme.colors.error.main};

    &:hover {
      background-color: ${({ theme }) => theme.colors.error.light}20;
    }
  }
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LanguageButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, active }) => active ? theme.colors.primary.main : 'transparent'};
  color: ${({ theme, active }) => active ? theme.colors.primary.contrastText : theme.colors.text.primary};
  border: 1px solid ${({ theme, active }) => active ? theme.colors.primary.main : theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme, active }) => active ? theme.colors.primary.dark : theme.colors.grey[100]};
    border-color: ${({ theme, active }) => active ? theme.colors.primary.dark : theme.colors.grey[400]};
  }
`;

// Header Component
const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<BulgarianUser | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Check authentication status
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await bulgarianAuthService.getCurrentUserProfile();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await bulgarianAuthService.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen && !(event.target as Element).closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* Logo */}
        <Logo to="/">
          🚗 Globul Cars
        </Logo>

        {/* Navigation */}
        <Navigation>
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavLink to="/cars">{t('nav.cars')}</NavLink>
          <NavLink to="/sell">{t('nav.sell')}</NavLink>

          {/* Language Selector */}
          <LanguageSelector>
            <LanguageButton
              active={language === 'bg'}
              onClick={() => setLanguage('bg')}
            >
              БГ
            </LanguageButton>
            <LanguageButton
              active={language === 'en'}
              onClick={() => setLanguage('en')}
            >
              EN
            </LanguageButton>
          </LanguageSelector>

          {/* User Menu */}
          {user ? (
            <UserMenu className="user-menu">
              <UserButton onClick={toggleUserMenu}>
                {user.photoURL ? (
                  <UserAvatar src={user.photoURL} alt={user.displayName} />
                ) : (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#00966B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <UserInfo>
                  <UserName>{user.displayName}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
              </UserButton>

              <DropdownMenu isOpen={isUserMenuOpen}>
                <DropdownItem onClick={() => navigate('/dashboard')}>
                  {t('nav.dashboard')}
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/cars?owner=' + user.uid)}>
                  {t('nav.myCars')}
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/messages')}>
                  {t('nav.messages')}
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/favorites')}>
                  {t('nav.favorites')}
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/settings')}>
                  {t('nav.settings')}
                </DropdownItem>
                <DropdownItem className="danger" onClick={handleLogout}>
                  {t('nav.logout')}
                </DropdownItem>
              </DropdownMenu>
            </UserMenu>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <NavLink to="/login">{t('nav.login')}</NavLink>
              <NavLink to="/register" className="active">
                {t('nav.register')}
              </NavLink>
            </div>
          )}

          {/* Notification Bell */}
          {user && <NotificationBell />}
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;