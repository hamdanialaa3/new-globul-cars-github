// src/config/bulgarian-config.ts
// Bulgarian Configuration for Car Marketplace

export const BULGARIAN_CONFIG = {
  // Currency and Region
  currency: 'EUR',
  currencySymbol: '€',
  region: 'Bulgaria',
  locale: 'bg-BG',
  timezone: 'Europe/Sofia',

  // Language Settings
  defaultLanguage: 'bg',
  supportedLanguages: ['bg', 'en'] as const,

  // Phone Settings
  phonePrefix: '+359',
  phoneFormat: '+359 XX XXX XXXX',

  // Date and Time Formats
  dateFormat: 'DD.MM.YYYY',
  timeFormat: 'HH:mm',
  datetimeFormat: 'DD.MM.YYYY HH:mm',

  // Number Formatting
  decimalSeparator: ',',
  thousandSeparator: '.',

  // Car Categories (Bulgarian)
  carCategories: {
    sedan: 'Седан',
    hatchback: 'Хечбек',
    suv: 'Джип',
    coupe: 'Купе',
    convertible: 'Кабрио',
    wagon: 'Комби',
    pickup: 'Пикап',
    van: 'Ван'
  },

  // Fuel Types (Bulgarian)
  fuelTypes: {
    gasoline: 'Бензин',
    diesel: 'Дизел',
    electric: 'Електрически',
    hybrid: 'Хибриден',
    gas: 'Газ'
  },

  // Transmission Types (Bulgarian)
  transmissionTypes: {
    manual: 'Ръчна',
    automatic: 'Автоматична',
    cvt: 'Безстепенна'
  },

  // Colors (Bulgarian)
  colors: {
    white: 'Бял',
    black: 'Черен',
    silver: 'Сребрист',
    gray: 'Сив',
    blue: 'Син',
    red: 'Червен',
    green: 'Зелен',
    yellow: 'Жълт',
    orange: 'Оранжев',
    purple: 'Лилаво',
    brown: 'Кафяв'
  },

  // API Endpoints
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5001',
    firebase: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    }
  },

  // UI Settings
  ui: {
    primaryColor: '#1a365d', // Bulgarian Blue
    secondaryColor: '#e53e3e', // Bulgarian Red
    accentColor: '#38a169', // Bulgarian Green
    backgroundColor: '#f7fafc',
    textColor: '#2d3748',
    borderRadius: '8px',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif"
  },

  // Validation Rules
  validation: {
    minPasswordLength: 8,
    maxCarTitleLength: 100,
    maxDescriptionLength: 2000,
    maxPhoneLength: 15,
    minPrice: 100,
    maxPrice: 1000000
  }
};

export type BulgarianLanguage = typeof BULGARIAN_CONFIG.supportedLanguages[number];
export type CarCategory = keyof typeof BULGARIAN_CONFIG.carCategories;
export type FuelType = keyof typeof BULGARIAN_CONFIG.fuelTypes;
export type TransmissionType = keyof typeof BULGARIAN_CONFIG.transmissionTypes;
export type CarColor = keyof typeof BULGARIAN_CONFIG.colors;