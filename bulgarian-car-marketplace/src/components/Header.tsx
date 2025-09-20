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

// Removed legacy user menu components to avoid duplication; user actions are now in Settings menu

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

// Settings menu styles
const SettingsMenu = styled.div`
  position: relative;
`;

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }
`;

// Header Component
const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<BulgarianUser | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBoldText, setIsBoldText] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bulgarian.boldText') === 'true';
    }
    return false;
  });

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

  // Removed legacy toggleUserMenu, using settings menu instead

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isUserMenuOpen && !target.closest('.user-menu')) setIsUserMenuOpen(false);
      if (isSettingsOpen && !target.closest('.settings-menu')) setIsSettingsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen, isSettingsOpen]);

  // Apply bold text preference
  React.useEffect(() => {
    document.body.classList.toggle('bold-text', isBoldText);
    try {
      localStorage.setItem('bulgarian.boldText', String(isBoldText));
    } catch {}
  }, [isBoldText]);

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

          {/* Settings Menu: contains language, auth/profile, and text toggle */}
          <SettingsMenu className="settings-menu">
            <SettingsButton onClick={() => setIsSettingsOpen(!isSettingsOpen)} aria-haspopup="menu" aria-expanded={isSettingsOpen}>
              ⚙️ <span>Settings</span>
            </SettingsButton>
            <DropdownMenu isOpen={isSettingsOpen}>
              {/* Language controls (moved, not duplicated) */}
              <div style={{ padding: '12px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ marginBottom: '8px', fontSize: '0.9rem', opacity: 0.8 }}>Language</div>
                <LanguageSelector>
                  <LanguageButton active={language === 'bg'} onClick={() => setLanguage('bg')}>БГ</LanguageButton>
                  <LanguageButton active={language === 'en'} onClick={() => setLanguage('en')}>EN</LanguageButton>
                </LanguageSelector>
              </div>

              {/* Auth/Profile controls */}
              {user ? (
                <>
                  <DropdownItem onClick={() => { navigate('/dashboard'); setIsSettingsOpen(false); }}>
                    👤 Dashboard
                  </DropdownItem>
                  <DropdownItem onClick={() => { handleLogout(); setIsSettingsOpen(false); }} className="danger">
                    ↩️ {t('nav.logout')}
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem onClick={() => { navigate('/login'); setIsSettingsOpen(false); }}>
                    🔑 {t('nav.login')}
                  </DropdownItem>
                  <DropdownItem onClick={() => { navigate('/register'); setIsSettingsOpen(false); }}>
                    ➕ {t('nav.register')}
                  </DropdownItem>
                </>
              )}

              {/* Bold text toggle */}
              <DropdownItem onClick={() => setIsBoldText(!isBoldText)}>
                {isBoldText ? '🔓 Disable bold text' : '🔒 Enable bold text'}
              </DropdownItem>
            </DropdownMenu>
          </SettingsMenu>

          {/* Notification Bell remains available */}
          {user && <NotificationBell />}
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;