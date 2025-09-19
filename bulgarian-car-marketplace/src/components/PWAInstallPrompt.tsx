// src/components/PWAInstallPrompt.tsx
// PWA Install Prompt Component
// PWA install button display component

import React, { useState } from 'react';
import styled from 'styled-components';
import { usePWA } from '../hooks/usePWA';
import { useTranslation } from '../hooks/useTranslation';

const InstallPromptContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const InstallContent = styled.div`
  flex: 1;
`;

const InstallTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const InstallDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
`;

const InstallActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const InstallButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const OfflineIndicator = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  background: #ff6b6b;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    right: 10px;
  }
`;

const OnlineIndicator = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  background: #51cf66;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(81, 207, 102, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    right: 10px;
  }
`;

interface PWAInstallPromptProps {
  onDismiss?: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onDismiss }) => {
  const { isInstallable, isOnline, installApp } = usePWA();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [showOnlineIndicator, setShowOnlineIndicator] = useState(false);

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  // Show online indicator when coming back online
  React.useEffect(() => {
    if (isOnline && !showOnlineIndicator) {
      setShowOnlineIndicator(true);
      const timer = setTimeout(() => setShowOnlineIndicator(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, showOnlineIndicator]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Offline Indicator */}
      {!isOnline && (
        <OfflineIndicator>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            {t('pwa.offline', 'Нямате интернет връзка')}
          </div>
          <div>
            {t('pwa.offlineDesc', 'Работете офлайн с ограничени функции')}
          </div>
        </OfflineIndicator>
      )}

      {/* Online Indicator */}
      {showOnlineIndicator && isOnline && (
        <OnlineIndicator>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {t('pwa.online', 'Връзката е възстановена')}
          </div>
        </OnlineIndicator>
      )}

      {/* Install Prompt */}
      {isInstallable && (
        <InstallPromptContainer>
          <InstallContent>
            <InstallTitle>
              {t('pwa.installTitle', 'Инсталирайте Globul Cars')}
            </InstallTitle>
            <InstallDescription>
              {t('pwa.installDesc', 'Добавете приложението на началния си екран за по-бърз достъп и офлайн функционалност')}
            </InstallDescription>
          </InstallContent>

          <InstallActions>
            <InstallButton onClick={handleInstall}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              {t('pwa.install', 'Инсталирай')}
            </InstallButton>

            <DismissButton onClick={handleDismiss}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </DismissButton>
          </InstallActions>
        </InstallPromptContainer>
      )}
    </>
  );
};

export default PWAInstallPrompt;