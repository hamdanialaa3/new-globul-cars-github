// src/hooks/useTranslation.tsx
// Translation hook for Bulgarian/English support

import React, { useContext, useState, useMemo, useCallback } from 'react';
import { translations, BulgarianLanguage } from '../locales/translations';

interface TranslationContextType {
  language: BulgarianLanguage;
  setLanguage: (lang: BulgarianLanguage) => void;
  t: (key: string, defaultValue?: string) => string;
}

const TranslationContext = React.createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<BulgarianLanguage>('bg');

  const t = useCallback((key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return value || defaultValue || key;
  }, [language]);

  const contextValue = useMemo<TranslationContextType>(() => ({
    language,
    setLanguage,
    t
  }), [language, t]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};