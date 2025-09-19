// src/utils/errorHandling.ts
// Error handling utilities for Bulgarian Car Marketplace

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userMessage?: string;
}

export class BulgarianErrorHandler {
  private static instance: BulgarianErrorHandler;
  private errors: AppError[] = [];

  static getInstance(): BulgarianErrorHandler {
    if (!BulgarianErrorHandler.instance) {
      BulgarianErrorHandler.instance = new BulgarianErrorHandler();
    }
    return BulgarianErrorHandler.instance;
  }

  // Handle Firebase errors with Bulgarian translations
  static handleFirebaseError(error: any): AppError {
    const firebaseErrors: { [key: string]: { bg: string; en: string } } = {
      'auth/user-not-found': {
        bg: 'Потребителят не е намерен',
        en: 'User not found'
      },
      'auth/wrong-password': {
        bg: 'Грешна парола',
        en: 'Wrong password'
      },
      'auth/email-already-in-use': {
        bg: 'Имейл адресът вече се използва',
        en: 'Email already in use'
      },
      'auth/weak-password': {
        bg: 'Паролата е твърде слаба',
        en: 'Password is too weak'
      },
      'auth/invalid-email': {
        bg: 'Невалиден имейл адрес',
        en: 'Invalid email address'
      },
      'auth/network-request-failed': {
        bg: 'Проблем с интернет връзката',
        en: 'Network connection problem'
      },
      'auth/too-many-requests': {
        bg: 'Твърде много опити. Опитайте по-късно',
        en: 'Too many attempts. Try again later'
      }
    };

    const errorCode = error.code || 'unknown-error';
    const translations = firebaseErrors[errorCode] || {
      bg: 'Възникна неочаквана грешка',
      en: 'An unexpected error occurred'
    };

    return {
      code: errorCode,
      message: error.message || translations.en,
      userMessage: translations.bg,
      details: error,
      timestamp: new Date()
    };
  }

  // Handle API errors
  static handleApiError(error: any): AppError {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const statusMessages: { [key: number]: { bg: string; en: string } } = {
        400: { bg: 'Невалидни данни', en: 'Invalid data' },
        401: { bg: 'Нямате достъп', en: 'Unauthorized access' },
        403: { bg: 'Достъпът е забранен', en: 'Access forbidden' },
        404: { bg: 'Ресурсът не е намерен', en: 'Resource not found' },
        500: { bg: 'Сървърна грешка', en: 'Server error' },
        502: { bg: 'Лоша gateway', en: 'Bad gateway' },
        503: { bg: 'Услугата е недостъпна', en: 'Service unavailable' }
      };

      const message = statusMessages[status] || {
        bg: 'Неизвестна грешка',
        en: 'Unknown error'
      };

      return {
        code: `HTTP_${status}`,
        message: error.response.data?.message || message.en,
        userMessage: message.bg,
        details: error.response.data,
        timestamp: new Date()
      };
    } else if (error.request) {
      // Network error
      return {
        code: 'NETWORK_ERROR',
        message: 'Network request failed',
        userMessage: 'Проблем с интернет връзката',
        details: error.request,
        timestamp: new Date()
      };
    } else {
      // Other error
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'Unknown error',
        userMessage: 'Възникна неочаквана грешка',
        details: error,
        timestamp: new Date()
      };
    }
  }

  // Handle validation errors
  static handleValidationError(field: string, value: any, rule: string): AppError {
    const validationMessages: { [key: string]: { bg: string; en: string } } = {
      required: {
        bg: `${field} е задължително поле`,
        en: `${field} is required`
      },
      email: {
        bg: 'Невалиден имейл адрес',
        en: 'Invalid email address'
      },
      phone: {
        bg: 'Невалиден телефонен номер',
        en: 'Invalid phone number'
      },
      minLength: {
        bg: `${field} трябва да бъде поне ${value} символа`,
        en: `${field} must be at least ${value} characters`
      },
      maxLength: {
        bg: `${field} не може да бъде повече от ${value} символа`,
        en: `${field} cannot be more than ${value} characters`
      },
      numeric: {
        bg: `${field} трябва да бъде число`,
        en: `${field} must be a number`
      },
      positive: {
        bg: `${field} трябва да бъде положително число`,
        en: `${field} must be a positive number`
      }
    };

    const message = validationMessages[rule] || {
      bg: `Невалидна стойност за ${field}`,
      en: `Invalid value for ${field}`
    };

    return {
      code: 'VALIDATION_ERROR',
      message: message.en,
      userMessage: message.bg,
      details: { field, value, rule },
      timestamp: new Date()
    };
  }

  // Log error for monitoring
  logError(error: AppError): void {
    this.errors.push(error);

    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('App Error:', error);
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(error);
    }
  }

  // Send error to monitoring service
  private sendToMonitoring(error: AppError): void {
    // Placeholder for monitoring service integration
    // Example: Google Analytics, Sentry, LogRocket, etc.
    try {
      // You can implement actual monitoring service here
      console.log('Sending error to monitoring service:', error);
    } catch (monitoringError) {
      console.error('Failed to send error to monitoring service:', monitoringError);
    }
  }

  // Get recent errors
  getRecentErrors(limit: number = 10): AppError[] {
    return this.errors.slice(-limit);
  }

  // Clear error history
  clearErrors(): void {
    this.errors = [];
  }
}

// Global error handler instance
export const errorHandler = BulgarianErrorHandler.getInstance();

// Utility function to handle async errors
export const handleAsyncError = async <T>(
  asyncFn: () => Promise<T>,
  errorHandler?: (error: AppError) => void
): Promise<T | null> => {
  try {
    return await asyncFn();
  } catch (error) {
    const appError = BulgarianErrorHandler.handleApiError(error);
    BulgarianErrorHandler.getInstance().logError(appError);

    if (errorHandler) {
      errorHandler(appError);
    }

    return null;
  }
};

// Hook for handling errors in React components
export const useErrorHandler = () => {
  const handleError = (error: any, context?: string) => {
    let appError: AppError;

    if (error.code && error.code.startsWith('auth/')) {
      appError = BulgarianErrorHandler.handleFirebaseError(error);
    } else if (error.response || error.request) {
      appError = BulgarianErrorHandler.handleApiError(error);
    } else {
      appError = {
        code: 'COMPONENT_ERROR',
        message: error.message || 'Component error',
        userMessage: 'Възникна грешка в компонента',
        details: { error, context },
        timestamp: new Date()
      };
    }

    BulgarianErrorHandler.getInstance().logError(appError);
    return appError;
  };

  return { handleError };
};