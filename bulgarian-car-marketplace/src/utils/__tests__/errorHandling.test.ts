// src/utils/__tests__/errorHandling.test.ts
// Unit tests for error handling utilities

import { BulgarianErrorHandler, handleAsyncError, useErrorHandler } from '../errorHandling';

describe('BulgarianErrorHandler', () => {
  beforeEach(() => {
    // Reset the singleton instance
    (BulgarianErrorHandler as any).instance = null;
  });

  describe('handleFirebaseError', () => {
    test('should handle auth/user-not-found error', () => {
      const error = { code: 'auth/user-not-found' };
      const result = BulgarianErrorHandler.handleFirebaseError(error);

      expect(result.code).toBe('auth/user-not-found');
      expect(result.userMessage).toBe('Потребителят не е намерен');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    test('should handle auth/wrong-password error', () => {
      const error = { code: 'auth/wrong-password' };
      const result = BulgarianErrorHandler.handleFirebaseError(error);

      expect(result.code).toBe('auth/wrong-password');
      expect(result.userMessage).toBe('Грешна парола');
    });

    test('should handle unknown Firebase errors', () => {
      const error = { code: 'auth/unknown-error', message: 'Unknown error' };
      const result = BulgarianErrorHandler.handleFirebaseError(error);

      expect(result.code).toBe('auth/unknown-error');
      expect(result.userMessage).toBe('Възникна неочаквана грешка');
    });
  });

  describe('handleApiError', () => {
    test('should handle 400 status error', () => {
      const error = {
        response: {
          status: 400,
          data: { message: 'Invalid data' }
        }
      };
      const result = BulgarianErrorHandler.handleApiError(error);

      expect(result.code).toBe('HTTP_400');
      expect(result.userMessage).toBe('Невалидни данни');
    });

    test('should handle 404 status error', () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' }
        }
      };
      const result = BulgarianErrorHandler.handleApiError(error);

      expect(result.code).toBe('HTTP_404');
      expect(result.userMessage).toBe('Ресурсът не е намерен');
    });

    test('should handle network errors', () => {
      const error = {
        request: {},
        message: 'Network Error'
      };
      const result = BulgarianErrorHandler.handleApiError(error);

      expect(result.code).toBe('NETWORK_ERROR');
      expect(result.userMessage).toBe('Проблем с интернет връзката');
    });

    test('should handle other errors', () => {
      const error = {
        message: 'Unknown error'
      };
      const result = BulgarianErrorHandler.handleApiError(error);

      expect(result.code).toBe('UNKNOWN_ERROR');
      expect(result.userMessage).toBe('Възникна неочаквана грешка');
    });
  });

  describe('handleValidationError', () => {
    test('should handle required field error', () => {
      const result = BulgarianErrorHandler.handleValidationError('Име', '', 'required');

      expect(result.code).toBe('VALIDATION_ERROR');
      expect(result.userMessage).toBe('Име е задължително поле');
    });

    test('should handle email validation error', () => {
      const result = BulgarianErrorHandler.handleValidationError('Имейл', 'invalid', 'email');

      expect(result.code).toBe('VALIDATION_ERROR');
      expect(result.userMessage).toBe('Невалиден имейл адрес');
    });

    test('should handle minLength validation error', () => {
      const result = BulgarianErrorHandler.handleValidationError('Парола', '8', 'minLength');

      expect(result.code).toBe('VALIDATION_ERROR');
      expect(result.userMessage).toBe('Парола трябва да бъде поне 8 символа');
    });
  });

  describe('logError', () => {
    test('should log error and maintain error history', () => {
      const instance = BulgarianErrorHandler.getInstance();
      const error: any = {
        code: 'TEST_ERROR',
        message: 'Test error',
        userMessage: 'Тестова грешка',
        timestamp: new Date()
      };

      instance.logError(error);

      const errors = instance.getRecentErrors();
      expect(errors).toContain(error);
    });

    test('should limit error history to 100 entries', () => {
      const instance = BulgarianErrorHandler.getInstance();

      // Add 101 errors
      for (let i = 0; i < 101; i++) {
        const error: any = {
          code: `ERROR_${i}`,
          message: `Error ${i}`,
          userMessage: `Грешка ${i}`,
          timestamp: new Date()
        };
        instance.logError(error);
      }

      const errors = instance.getRecentErrors(200);
      expect(errors.length).toBeLessThanOrEqual(100);
    });
  });

  describe('getRecentErrors', () => {
    test('should return recent errors in chronological order', () => {
      const instance = BulgarianErrorHandler.getInstance();

      const error1: any = { code: 'ERROR_1', timestamp: new Date() };
      const error2: any = { code: 'ERROR_2', timestamp: new Date() };

      instance.logError(error1);
      instance.logError(error2);

      const errors = instance.getRecentErrors();
      expect(errors[0]).toBe(error1); // First added first
      expect(errors[1]).toBe(error2);
    });
  });
});

describe('handleAsyncError', () => {
  test('should return result for successful async operation', async () => {
    const asyncFn = async () => 'success';
    const result = await handleAsyncError(asyncFn);

    expect(result).toBe('success');
  });

  test('should return null and call error handler for failed async operation', async () => {
    const errorHandler = jest.fn();
    const asyncFn = async () => {
      throw new Error('Test error');
    };

    const result = await handleAsyncError(asyncFn, errorHandler);

    expect(result).toBe(null);
    expect(errorHandler).toHaveBeenCalled();
  });
});

describe('useErrorHandler', () => {
  test('should handle Firebase errors', () => {
    const { handleError } = useErrorHandler();
    const firebaseError = { code: 'auth/user-not-found' };

    const result = handleError(firebaseError);

    expect(result.code).toBe('auth/user-not-found');
    expect(result.userMessage).toBe('Потребителят не е намерен');
  });

  test('should handle API errors', () => {
    const { handleError } = useErrorHandler();
    const apiError = {
      response: {
        status: 404,
        data: { message: 'Not found' }
      }
    };

    const result = handleError(apiError);

    expect(result.code).toBe('HTTP_404');
    expect(result.userMessage).toBe('Ресурсът не е намерен');
  });

  test('should handle generic errors', () => {
    const { handleError } = useErrorHandler();
    const genericError = new Error('Generic error');

    const result = handleError(genericError);

    expect(result.code).toBe('COMPONENT_ERROR');
    expect(result.userMessage).toBe('Възникна грешка в компонента');
  });
});