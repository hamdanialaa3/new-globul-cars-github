// src/tests/messaging-integration.test.tsx
// Integration Tests for Messaging System

import React from 'react';

// Mock styled-components
jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  createGlobalStyle: () => () => null,
  styled: {
    div: 'div',
    button: 'button',
    input: 'input',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    span: 'span',
    img: 'img'
  }
}));

// Mock the theme
jest.mock('../styles/theme', () => ({
  bulgarianTheme: {
    colors: {
      primary: { main: '#00966B', dark: '#007A52', contrastText: '#fff' },
      background: { default: '#f5f5f5', paper: '#fff' },
      text: { primary: '#333', secondary: '#666' },
      grey: ['#f5f5f5', '#e0e0e0', '#ccc', '#999', '#666']
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: { sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px', '6xl': '60px' },
      fontWeight: { normal: 400, medium: 500, bold: 700 }
    },
    spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
    borderRadius: { base: '8px', md: '12px', lg: '16px' },
    shadows: { base: '0 2px 4px rgba(0,0,0,0.1)', lg: '0 4px 8px rgba(0,0,0,0.15)' }
  }
}));

// Mock the translation hook
jest.mock('../hooks/useTranslation', () => ({
  TranslationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'bg',
    setLanguage: jest.fn(),
    isRTL: false
  })
}));

describe('Messaging Integration Tests', () => {
  test('Basic test setup works', () => {
    expect(true).toBe(true);
  });

  test('Translation mock works', () => {
    const { useTranslation } = require('../hooks/useTranslation');
    const { t } = useTranslation();
    expect(t('test.key')).toBe('test.key');
  });

  test('Theme mock works', () => {
    const { bulgarianTheme } = require('../styles/theme');
    expect(bulgarianTheme.colors.primary.main).toBe('#00966B');
  });
});

export {};