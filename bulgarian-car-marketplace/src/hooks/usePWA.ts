// src/hooks/usePWA.ts
// Custom hook for PWA functionality
// Custom hook for PWA functionality

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  registration: ServiceWorkerRegistration | null;
}

export const usePWA = () => {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: navigator.onLine,
    deferredPrompt: null,
    registration: null,
  });

  // Register service worker
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          console.log('Service Worker registered successfully:', registration);

          setPwaState(prev => ({
            ...prev,
            registration,
          }));

          // Handle updates
          const handleUpdateFound = () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', handleWorkerStateChange);
            }
          };

          const handleWorkerStateChange = () => {
            if (registration.installing?.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              console.log('New content is available and will be used when all tabs for this page are closed.');
            }
          };

          registration.addEventListener('updatefound', handleUpdateFound);

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  // Handle install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('Install prompt event fired');

      setPwaState(prev => ({
        ...prev,
        isInstallable: true,
        deferredPrompt: e as BeforeInstallPromptEvent,
      }));
    };

    const handleAppInstalled = () => {
      console.log('App was installed');
      setPwaState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setPwaState(prev => ({
        ...prev,
        isOnline: true,
      }));
    };

    const handleOffline = () => {
      setPwaState(prev => ({
        ...prev,
        isOnline: false,
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Install the app
  const installApp = async () => {
    if (!pwaState.deferredPrompt) {
      console.log('No install prompt available');
      return false;
    }

    try {
      await pwaState.deferredPrompt.prompt();
      const { outcome } = await pwaState.deferredPrompt.userChoice;

      console.log('Install outcome:', outcome);

      setPwaState(prev => ({
        ...prev,
        isInstallable: false,
        deferredPrompt: null,
      }));

      return outcome === 'accepted';
    } catch (error) {
      console.error('Install failed:', error);
      return false;
    }
  };

  // Update service worker
  const updateServiceWorker = async () => {
    if (!pwaState.registration) {
      return false;
    }

    try {
      await pwaState.registration.update();
      console.log('Service Worker updated');
      return true;
    } catch (error) {
      console.error('Service Worker update failed:', error);
      return false;
    }
  };

  // Skip waiting for service worker update
  const skipWaiting = async () => {
    if (!pwaState.registration) {
      return false;
    }

    const newWorker = pwaState.registration.waiting;
    if (newWorker) {
      newWorker.postMessage({ type: 'SKIP_WAITING' });
      return true;
    }

    return false;
  };

  // Check if app is running in standalone mode
  const isStandalone = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  };

  return {
    ...pwaState,
    isStandalone: isStandalone(),
    installApp,
    updateServiceWorker,
    skipWaiting,
  };
};

export default usePWA;