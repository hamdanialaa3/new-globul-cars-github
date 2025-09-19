// src/firebase/analytics-service.ts
// Analytics Service for Bulgarian Car Marketplace

import { analytics } from './firebase-config';
import { logEvent, setUserProperties, setUserId } from 'firebase/analytics';

export class BulgarianAnalyticsService {
  // Track page views
  static trackPageView(pageName: string, pageTitle?: string) {
    if (!analytics) return;

    try {
      logEvent(analytics, 'page_view', {
        page_title: pageTitle || pageName,
        page_location: window.location.href,
        page_path: window.location.pathname,
        custom_page: pageName
      });
    } catch (error) {
      console.warn('Analytics page view tracking failed:', error);
    }
  }

  // Track user authentication events
  static trackAuthEvent(event: 'login' | 'register' | 'logout', method?: string) {
    if (!analytics) return;

    try {
      if (event === 'login') {
        logEvent(analytics, 'login', {
          method: method || 'email'
        });
      } else {
        logEvent(analytics, event, {
          method: method || 'email'
        });
      }
    } catch (error) {
      console.warn('Analytics auth event tracking failed:', error);
    }
  }

  // Track car-related events
  static trackCarEvent(event: 'view_car' | 'search_cars' | 'add_car' | 'edit_car' | 'delete_car', carData?: any) {
    if (!analytics) return;

    try {
      const eventData: any = {
        custom_event: `car_${event}`
      };

      if (carData) {
        eventData.car_id = carData.id;
        eventData.car_price = carData.price;
        eventData.car_location = carData.location;
        eventData.car_brand = carData.brand;
        eventData.car_year = carData.year;
      }

      logEvent(analytics, 'car_interaction', eventData);
    } catch (error) {
      console.warn('Analytics car event tracking failed:', error);
    }
  }

  // Track messaging events
  static trackMessageEvent(event: 'send_message' | 'view_messages' | 'start_conversation') {
    if (!analytics) return;

    try {
      logEvent(analytics, 'message_interaction', {
        custom_event: `message_${event}`
      });
    } catch (error) {
      console.warn('Analytics message event tracking failed:', error);
    }
  }

  // Track search events
  static trackSearchEvent(searchTerm: string, filters?: any) {
    if (!analytics) return;

    try {
      logEvent(analytics, 'search', {
        search_term: searchTerm,
        custom_filters: filters ? JSON.stringify(filters) : undefined
      });
    } catch (error) {
      console.warn('Analytics search event tracking failed:', error);
    }
  }

  // Track user engagement
  static trackEngagement(event: 'scroll' | 'time_spent' | 'click' | 'share', details?: any) {
    if (!analytics) return;

    try {
      logEvent(analytics, 'user_engagement', {
        engagement_type: event,
        ...details
      });
    } catch (error) {
      console.warn('Analytics engagement tracking failed:', error);
    }
  }

  // Track errors
  static trackError(errorType: string, errorMessage: string, context?: any) {
    if (!analytics) return;

    try {
      logEvent(analytics, 'exception', {
        description: `${errorType}: ${errorMessage}`,
        fatal: false,
        custom_context: context ? JSON.stringify(context) : undefined
      });
    } catch (error) {
      console.warn('Analytics error tracking failed:', error);
    }
  }

  // Set user properties
  static setUserProperties(userId: string, properties: Record<string, any>) {
    if (!analytics) return;

    try {
      setUserId(analytics, userId);
      setUserProperties(analytics, {
        user_type: properties.userType || 'regular',
        preferred_language: properties.language || 'bg',
        registration_date: properties.registrationDate,
        location: properties.location,
        ...properties
      });
    } catch (error) {
      console.warn('Analytics user properties setting failed:', error);
    }
  }

  // Track performance metrics
  static trackPerformance(metric: string, value: number, context?: any) {
    if (!analytics) return;

    try {
      logEvent(analytics, 'performance_metric', {
        metric_name: metric,
        metric_value: value,
        custom_context: context ? JSON.stringify(context) : undefined
      });
    } catch (error) {
      console.warn('Analytics performance tracking failed:', error);
    }
  }

  // Track business metrics
  static trackBusinessMetric(metric: 'car_listed' | 'car_sold' | 'user_registered' | 'message_sent', value?: number) {
    if (!analytics) return;

    try {
      logEvent(analytics, 'business_metric', {
        metric_type: metric,
        metric_value: value || 1
      });
    } catch (error) {
      console.warn('Analytics business metric tracking failed:', error);
    }
  }

  // Track conversion events
  static trackConversion(event: 'signup_complete' | 'car_purchase' | 'contact_seller', value?: number) {
    if (!analytics) return;

    try {
      logEvent(analytics, 'conversion', {
        conversion_type: event,
        value: value
      });
    } catch (error) {
      console.warn('Analytics conversion tracking failed:', error);
    }
  }
}

// Analytics hooks for React components
export const useAnalytics = () => {
  return {
    trackPageView: BulgarianAnalyticsService.trackPageView,
    trackAuthEvent: BulgarianAnalyticsService.trackAuthEvent,
    trackCarEvent: BulgarianAnalyticsService.trackCarEvent,
    trackMessageEvent: BulgarianAnalyticsService.trackMessageEvent,
    trackSearchEvent: BulgarianAnalyticsService.trackSearchEvent,
    trackEngagement: BulgarianAnalyticsService.trackEngagement,
    trackError: BulgarianAnalyticsService.trackError,
    setUserProperties: BulgarianAnalyticsService.setUserProperties,
    trackPerformance: BulgarianAnalyticsService.trackPerformance,
    trackBusinessMetric: BulgarianAnalyticsService.trackBusinessMetric,
    trackConversion: BulgarianAnalyticsService.trackConversion,
  };
};