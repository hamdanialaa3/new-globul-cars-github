// src/components/AnalyticsTracker.tsx
// Analytics Tracker Component for Bulgarian Car Marketplace

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BulgarianAnalyticsService } from '../firebase/analytics-service';

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    const pageName = location.pathname === '/' ? 'home' :
                    location.pathname.startsWith('/cars') ? 'cars' :
                    location.pathname.startsWith('/messages') ? 'messages' :
                    location.pathname.startsWith('/profile') ? 'profile' :
                    location.pathname.startsWith('/admin') ? 'admin' :
                    location.pathname.startsWith('/sell-car') ? 'sell_car' :
                    location.pathname.startsWith('/login') ? 'login' :
                    location.pathname.startsWith('/register') ? 'register' :
                    'unknown';

    BulgarianAnalyticsService.trackPageView(pageName, document.title);
  }, [location]);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;