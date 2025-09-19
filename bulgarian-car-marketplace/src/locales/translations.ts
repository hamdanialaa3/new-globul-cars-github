// src/locales/translations.ts
// Bulgarian and English Translations

export const translations = {
  bg: {
    // Navigation
    nav: {
      home: 'Начало',
      cars: 'Коли',
      sell: 'Продай',
      about: 'За нас',
      contact: 'Контакт',
      login: 'Вход',
      register: 'Регистрация',
      logout: 'Изход',
      profile: 'Профил',
      messages: 'Съобщения',
      myCars: 'Моите коли',
      favorites: 'Любими',
      settings: 'Настройки',
      dashboard: 'Табло'
    },

    // Common
    common: {
      loading: 'Зареждане...',
      error: 'Грешка',
      success: 'Успех',
      save: 'Запази',
      cancel: 'Отказ',
      delete: 'Изтрий',
      edit: 'Редактирай',
      search: 'Търси',
      filter: 'Филтрирай',
      sort: 'Сортирай',
      price: 'Цена',
      location: 'Местоположение',
      description: 'Описание',
      photos: 'Снимки',
      contact: 'Контакт',
      message: 'Съобщение',
      send: 'Изпрати',
      back: 'Назад',
      next: 'Напред',
      previous: 'Предишен',
      close: 'Затвори'
    },

    // PWA
    pwa: {
      installTitle: 'Инсталирайте Globul Cars',
      installDesc: 'Добавете приложението на началния си екран за по-бърз достъп и офлайн функционалност',
      install: 'Инсталирай',
      offline: 'Нямате интернет връзка',
      offlineDesc: 'Работете офлайн с ограничени функции',
      online: 'Връзката е възстановена',
      installPrompt: 'Инсталирайте приложението за по-добро изживяване',
      updateAvailable: 'Налична е нова версия',
      updateNow: 'Актуализирай сега'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      cars: 'Cars',
      sell: 'Sell',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      profile: 'Profile',
      messages: 'Messages',
      myCars: 'My Cars',
      favorites: 'Favorites',
      settings: 'Settings',
      dashboard: 'Dashboard'
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      price: 'Price',
      location: 'Location',
      description: 'Description',
      photos: 'Photos',
      contact: 'Contact',
      message: 'Message',
      send: 'Send',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close'
    },

    // PWA
    pwa: {
      installTitle: 'Install Globul Cars',
      installDesc: 'Add the app to your home screen for faster access and offline functionality',
      install: 'Install',
      offline: 'No internet connection',
      offlineDesc: 'Work offline with limited features',
      online: 'Connection restored',
      installPrompt: 'Install the app for a better experience',
      updateAvailable: 'New version available',
      updateNow: 'Update now'
    }
  }
};

export type TranslationKey = keyof typeof translations.bg;
export type BulgarianLanguage = 'bg' | 'en';