// src/utils/__tests__/validation.test.ts
// Unit tests for validation utilities

import {
  validateEmail,
  validateBulgarianPhone,
  validatePasswordStrength,
  validateBulgarianName,
  validateCarPrice,
  validateCarYear
} from '../validation';

describe('Email Validation', () => {
  test('should validate correct email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('test.email+tag@domain.co.uk')).toBe(true);
    expect(validateEmail('user123@test-domain.com')).toBe(true);
  });

  test('should reject invalid email addresses', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('user@.com')).toBe(false);
  });
});

describe('Bulgarian Phone Validation', () => {
  test('should validate correct Bulgarian phone numbers', () => {
    expect(validateBulgarianPhone('+3598881234567')).toBe(true);
    expect(validateBulgarianPhone('08881234567')).toBe(true);
    expect(validateBulgarianPhone('+3598781234567')).toBe(true);
    expect(validateBulgarianPhone('08781234567')).toBe(true);
  });

  test('should reject invalid Bulgarian phone numbers', () => {
    expect(validateBulgarianPhone('')).toBe(false);
    expect(validateBulgarianPhone('123456789')).toBe(false);
    expect(validateBulgarianPhone('+359123456789')).toBe(false);
    expect(validateBulgarianPhone('088812345')).toBe(false);
    expect(validateBulgarianPhone('0888123456789')).toBe(false);
    expect(validateBulgarianPhone('+359888123456')).toBe(false);
    expect(validateBulgarianPhone('0888123456')).toBe(false);
  });
});

describe('Password Strength Validation', () => {
  test('should validate strong passwords', () => {
    const result = validatePasswordStrength('StrongPass123!');
    expect(result.isValid).toBe(true);
    expect(result.score).toBeGreaterThan(2);
  });

  test('should reject weak passwords', () => {
    const result = validatePasswordStrength('weak');
    expect(result.isValid).toBe(false);
    expect(result.score).toBeLessThan(2);
  });

  test('should provide feedback for password requirements', () => {
    const result = validatePasswordStrength('weak');
    expect(result.feedback).toContain('Password must be at least 8 characters long');
    expect(result.feedback).toContain('Password must contain uppercase letters');
    expect(result.feedback).toContain('Password must contain numbers');
    // Note: lowercase check passes for 'weak', so no feedback for that
  });
});

describe('Bulgarian Name Validation', () => {
  test('should validate correct Bulgarian names', () => {
    expect(validateBulgarianName('Иван Иванов')).toBe(true);
    expect(validateBulgarianName('Мария Петрова')).toBe(true);
    expect(validateBulgarianName('Александър Димитров-Костов')).toBe(true);
  });

  test('should reject invalid Bulgarian names', () => {
    expect(validateBulgarianName('')).toBe(false);
    expect(validateBulgarianName('A')).toBe(false);
    expect(validateBulgarianName('123')).toBe(false);
    expect(validateBulgarianName('Name With 123')).toBe(false);
  });
});

describe('Car Price Validation', () => {
  test('should validate correct car prices', () => {
    expect(validateCarPrice(1000)).toBe(true);
    expect(validateCarPrice(50000)).toBe(true);
    expect(validateCarPrice(500000)).toBe(true);
  });

  test('should reject invalid car prices', () => {
    expect(validateCarPrice(0)).toBe(false);
    expect(validateCarPrice(-1000)).toBe(false);
    expect(validateCarPrice(1000000)).toBe(false);
  });
});

describe('Car Year Validation', () => {
  test('should validate correct car years', () => {
    const currentYear = new Date().getFullYear();
    expect(validateCarYear(2020)).toBe(true);
    expect(validateCarYear(currentYear)).toBe(true);
    expect(validateCarYear(1950)).toBe(true);
  });

  test('should reject invalid car years', () => {
    const currentYear = new Date().getFullYear();
    expect(validateCarYear(1800)).toBe(false);
    expect(validateCarYear(currentYear + 2)).toBe(false);
  });
});