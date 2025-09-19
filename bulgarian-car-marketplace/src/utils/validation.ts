// src/utils/validation.ts
// Validation utilities for Bulgarian Car Marketplace

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Bulgarian phone number validation
export const validateBulgarianPhone = (phone: string): boolean => {
  // Remove all spaces and check format
  const cleanPhone = phone.replace(/\s+/g, '');

  // Check for +359 prefix format (+359 + operator + 9 digits = 14 digits total)
  const bulgarianRegex = /^\+359[8-9]\d{9}$/;

  // Check for local format (0 + operator + 9 digits = 11 digits total)
  const localRegex = /^0[8-9]\d{9}$/;

  return bulgarianRegex.test(cleanPhone) || localRegex.test(cleanPhone);
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password must be at least 8 characters long');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Password must contain lowercase letters');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Password must contain uppercase letters');
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Password must contain numbers');
  }

  // Special character check (optional, adds bonus point)
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(password)) {
    score += 1;
  }

  return {
    isValid: score >= 4,
    score,
    feedback
  };
};

// Bulgarian name validation (Cyrillic and Latin support)
export const validateBulgarianName = (name: string): boolean => {
  // Allow Cyrillic, Latin letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[а-яА-Яa-zA-Z\s\-']+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

// City validation (Bulgarian cities)
export const validateBulgarianCity = (city: string): boolean => {
  const bulgarianCities = [
    'София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора',
    'Плевен', 'Добрич', 'Сливен', 'Шумен', 'Перник', 'Хасково',
    'Ямбол', 'Пазарджик', 'Благоевград', 'Велико Търново', 'Враца',
    'Габрово', 'Асеновград', 'Видин', 'Кърджали', 'Кюстендил', 'Монтана',
    'Търговище', 'Силистра', 'Ловеч', 'Разград', 'Смолян', 'Дупница',
    'Горна Оряховица', 'Димитровград', 'Свищов', 'Петрич', 'Сандански',
    'Самоков', 'Лом', 'Карлово', 'Айтос', 'Несебър', 'Поморие'
  ];

  return bulgarianCities.includes(city.trim());
};

// Car year validation
export const validateCarYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1; // Allow next year for pre-orders
};

// Car price validation (Bulgarian market)
export const validateCarPrice = (price: number): boolean => {
  // Reasonable price range for Bulgarian market (EUR)
  return price >= 100 && price <= 500000;
};

// VIN validation (Vehicle Identification Number)
export const validateVIN = (vin: string): boolean => {
  if (vin.length !== 17) return false;

  // Remove spaces and convert to uppercase
  const cleanVIN = vin.replace(/\s+/g, '').toUpperCase();

  // Basic VIN format check (should contain only valid characters)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  return vinRegex.test(cleanVIN);
};

// Sanitize input (remove potentially dangerous characters)
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

// Rate limiting helper (simple in-memory implementation)
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) { // 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Export rate limiter instance
export const authRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

// CSRF protection helper (simple token generation)
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Input sanitization for forms
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};