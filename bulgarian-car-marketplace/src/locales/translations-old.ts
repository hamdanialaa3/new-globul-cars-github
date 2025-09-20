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

    // Home Page
    home: {
      hero: {
        title: 'Открийте вашата мечтана кола в България',
        subtitle: 'Над 15,000 проверени автомобила от доверени дилъри. Намерете перфектната кола за вас с нашата интелигентна система за търсене.',
        browseCars: 'Разгледай коли',
        sellCar: 'Продай колата си'
      },
      stats: {
        cars: 'Проверени коли',
        satisfiedCustomers: 'Доволни клиенти',
        dealers: 'Доверени дилъри',
        satisfaction: 'Удовлетвореност'
      },
      featured: {
        title: 'Препоръчани коли',
        subtitle: 'Открийте най-добрите оферти от нашите доверени дилъри',
        viewAll: 'Виж всички'
      },
      features: {
        title: 'Защо да изберете Globul Cars?',
        subtitle: 'Ние предлагаме най-добрия опит за купуване и продаване на автомобили в България',
        search: {
          title: 'Интелигентно търсене',
          description: 'Намерете точната кола която търсите с нашите напреднали филтри и AI препоръки'
        },
        verified: {
          title: 'Проверени дилъри',
          description: 'Всички наши дилъри са проверени и лицензирани за да гарантираме вашата сигурност'
        },
        finance: {
          title: 'Финансиране',
          description: 'Получете най-добрите условия за финансиране на вашата нова кола'
        },
        insurance: {
          title: 'Застраховка',
          description: 'Пълно застрахователно покритие за вашата кола с най-добрите цени'
        }
      }
    },

    // Footer
    footer: {
      description: 'Водещата платформа за купуване и продаване на автомобили в България. Свързваме купувачи и продавачи с доверие и сигурност.',
      quickLinks: 'Бързи връзки',
      services: 'Услуги',
      carValuation: 'Оценка на кола',
      financing: 'Финансиране',
      insurance: 'Застраховка',
      maintenance: 'Поддръжка',
      tradeIn: 'Размяна',
      contact: 'Контакт',
      phone: 'Телефон',
      email: 'Имейл',
      address: 'Адрес',
      workingHours: 'Работно време',
      copyright: 'Всички права запазени.',
      privacy: 'Поверителност',
      terms: 'Условия',
      cookies: 'Бисквитки',
      sitemap: 'Карта на сайта'
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

    // Cars Page
    cars: {
      title: 'Намерете своята идеална кола',
      subtitle: 'Разгледайте хиляди проверени автомобили от доверени дилъри в България',
      filters: {
        make: 'Марка',
        allMakes: 'Всички марки',
        priceRange: 'Ценови диапазон',
        fromPrice: 'От цена',
        toPrice: 'До цена',
        minPrice: 'Минимална цена',
        maxPrice: 'Максимална цена',
        fuelType: 'Тип гориво',
        allFuelTypes: 'Всички типове гориво',
        year: 'Година',
        fromYear: 'От година',
        toYear: 'До година',
        minYear: 'Минимална година',
        maxYear: 'Максимална година',
        search: 'Търси',
        clear: 'Изчисти филтрите'
      },
      results: {
        title: 'Резултати от търсенето',
        found: 'Намерени коли'
      },
      sort: {
        newest: 'Най-нови',
        oldest: 'Най-стари',
        priceLow: 'Цена: ниска към висока',
        priceHigh: 'Цена: висока към ниска',
        yearNew: 'Година: нови към стари',
        yearOld: 'Година: стари към нови',
        mileageLow: 'Пробег: нисък към висок',
        mileageHigh: 'Пробег: висок към нисък'
      },
      fuelTypes: {
        petrol: 'Бензин',
        diesel: 'Дизел',
        electric: 'Електрически',
        hybrid: 'Хибриден',
        gas: 'Газ',
        lpg: 'Пропан-бутан (LPG)',
        cng: 'Природен газ (CNG)',
        hydrogen: 'Водород',
        ethanol: 'Етанол',
        biodiesel: 'Биодизел',
        other: 'Друго'
      },
      transmission: {
        manual: 'Ръчна',
        automatic: 'Автоматична'
      },
      featured: 'Препоръчан',
      noResults: {
        title: 'Няма намерени резултати',
        message: 'Опитайте да промените критериите за търсене или изчистете филтрите',
        clearFilters: 'Изчисти филтрите'
      }
    },

    // Sell Car Page
    sellCar: {
      title: 'Продайте своята кола',
      subtitle: 'Добавете обявата си и достигнете до хиляди потенциални купувачи',
      basicInfo: 'Основна информация',
      technicalDetails: 'Технически данни',
      location: 'Местоположение',
      description: 'Описание',
      photos: 'Снимки',
      make: 'Марка',
      model: 'Модел',
      year: 'Година',
      mileage: 'Пробег',
      price: 'Цена',
      fuelType: 'Тип гориво',
      transmission: 'Трансмисия',
      engineSize: 'Обем на двигателя',
      power: 'Мощност',
      condition: 'Състояние',
      color: 'Цвят',
      city: 'Град',
      region: 'Регион',
      postalCode: 'Пощенски код',
      titleField: 'Заглавие',
      descriptionField: 'Описание',
      features: 'Особености',
      addFeature: 'Добави особеност',
      selectMake: 'Изберете марка',
      selectFuelType: 'Изберете тип гориво',
      selectTransmission: 'Изберете трансмисия',
      selectYear: 'Изберете година',
      selectPrice: 'Изберете цена',
      customPrice: 'Друга цена',
      enterCustomPrice: 'Въведете цена',
      selectCondition: 'Изберете състояние',
      selectColor: 'Изберете цвят',
      fuelTypes: {
        petrol: 'Бензин',
        diesel: 'Дизел',
        electric: 'Електрически',
        hybrid: 'Хибриден',
        gas: 'Газ',
        lpg: 'Втечнен нефтен газ (LPG)',
        cng: 'Компресиран природен газ (CNG)',
        hydrogen: 'Водород',
        ethanol: 'Етанол',
        biodiesel: 'Биодизел',
        other: 'Друго'
      },
      transmissions: {
        manual: 'Ръчна',
        automatic: 'Автоматична',
        semiAutomatic: 'Полуавтоматична'
      },
      conditions: {
        excellent: 'Отлично',
        veryGood: 'Много добро',
        good: 'Добро',
        fair: 'За ремонт',
        poor: 'Лошо'
      },
      colors: {
        white: 'Бял',
        black: 'Черен',
        silver: 'Сребърен',
        gray: 'Сив',
        blue: 'Син',
        red: 'Червен',
        green: 'Зелен',
        yellow: 'Жълт',
        orange: 'Оранжев',
        brown: 'Кафяв',
        purple: 'Лилав',
        other: 'Друго'
      },
      uploadPhotos: 'Качи снимки',
      maxImages: 'Максимум 10 снимки',
      submit: 'Публикувай обява',
      cancel: 'Отказ',
      success: {
        title: 'Обявата е публикувана успешно!',
        message: 'Вашата обява е активна и видима за всички потребители.'
      },
      error: 'Възникна грешка при публикуването на обявата.',
      validation: {
        required: 'Моля, попълнете всички задължителни полета.',
        year: 'Годината трябва да бъде между 1900 и 2025.',
        price: 'Цената трябва да бъде положително число.'
      }
    },

    // Search
    search: {
      advanced: {
        title: 'Разширено търсене'
      }
    },
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

    // Home Page
    home: {
      hero: {
        title: 'Find Your Dream Car in Bulgaria',
        subtitle: 'Over 15,000 verified cars from trusted dealers. Find the perfect car for you with our intelligent search system.',
        browseCars: 'Browse Cars',
        sellCar: 'Sell Your Car'
      },
      stats: {
        cars: 'Verified Cars',
        satisfiedCustomers: 'Satisfied Customers',
        dealers: 'Trusted Dealers',
        satisfaction: 'Satisfaction Rate'
      },
      featured: {
        title: 'Featured Cars',
        subtitle: 'Discover the best deals from our trusted dealers',
        viewAll: 'View All'
      },
      features: {
        title: 'Why Choose Globul Cars?',
        subtitle: 'We offer the best experience for buying and selling cars in Bulgaria',
        search: {
          title: 'Intelligent Search',
          description: 'Find the exact car you are looking for with our advanced filters and AI recommendations'
        },
        verified: {
          title: 'Verified Dealers',
          description: 'All our dealers are verified and licensed to guarantee your safety'
        },
        finance: {
          title: 'Financing',
          description: 'Get the best financing terms for your new car'
        },
        insurance: {
          title: 'Insurance',
          description: 'Complete insurance coverage for your car with the best prices'
        }
      }
    },

    // Footer
    footer: {
      description: 'The leading platform for buying and selling cars in Bulgaria. We connect buyers and sellers with trust and security.',
      quickLinks: 'Quick Links',
      services: 'Services',
      carValuation: 'Car Valuation',
      financing: 'Financing',
      insurance: 'Insurance',
      maintenance: 'Maintenance',
      tradeIn: 'Trade-In',
      contact: 'Contact',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      workingHours: 'Working Hours',
      copyright: 'All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      sitemap: 'Sitemap'
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

    // Cars Page
    cars: {
      title: 'Find Your Perfect Car',
      subtitle: 'Browse thousands of verified cars from trusted dealers in Bulgaria',
      filters: {
        make: 'Make',
        allMakes: 'All Makes',
        priceRange: 'Price Range',
        fromPrice: 'From Price',
        toPrice: 'To Price',
        minPrice: 'Min Price',
        maxPrice: 'Max Price',
        fuelType: 'Fuel Type',
        allFuelTypes: 'All Fuel Types',
        year: 'Year',
        fromYear: 'From Year',
        toYear: 'To Year',
        minYear: 'Min Year',
        maxYear: 'Max Year',
        search: 'Search',
        clear: 'Clear Filters'
      },
      results: {
        title: 'Search Results',
        found: 'cars found'
      },
      sort: {
        newest: 'Newest',
        oldest: 'Oldest',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        yearNew: 'Year: New to Old',
        yearOld: 'Year: Old to New',
        mileageLow: 'Mileage: Low to High',
        mileageHigh: 'Mileage: High to Low'
      },
      fuelTypes: {
        petrol: 'Petrol',
        diesel: 'Diesel',
        electric: 'Electric',
        hybrid: 'Hybrid',
        gas: 'Gas',
        lpg: 'Liquefied Petroleum Gas (LPG)',
        cng: 'Compressed Natural Gas (CNG)',
        hydrogen: 'Hydrogen',
        ethanol: 'Ethanol',
        biodiesel: 'Biodiesel',
        other: 'Other'
      },
      transmission: {
        manual: 'Manual',
        automatic: 'Automatic'
      },
      featured: 'Featured',
      noResults: {
        title: 'No Results Found',
        message: 'Try changing your search criteria or clear the filters',
        clearFilters: 'Clear Filters'
      }
    },

    // Sell Car Page
    sellCar: {
      title: 'Sell Your Car',
      subtitle: 'Add your listing and reach thousands of potential buyers',
      basicInfo: 'Basic Information',
      technicalDetails: 'Technical Details',
      location: 'Location',
      description: 'Description',
      photos: 'Photos',
      make: 'Make',
      model: 'Model',
      year: 'Year',
      mileage: 'Mileage',
      price: 'Price',
      fuelType: 'Fuel Type',
      transmission: 'Transmission',
      engineSize: 'Engine Size',
      power: 'Power',
      condition: 'Condition',
      color: 'Color',
      city: 'City',
      region: 'Region',
      postalCode: 'Postal Code',
      titleField: 'Title',
      descriptionField: 'Description',
      features: 'Features',
      addFeature: 'Add Feature',
      selectMake: 'Select Make',
      selectFuelType: 'Select Fuel Type',
      selectTransmission: 'Select Transmission',
      selectYear: 'Select Year',
      selectPrice: 'Select Price',
      customPrice: 'Custom Price',
      enterCustomPrice: 'Enter Custom Price',
      selectCondition: 'Select Condition',
      selectColor: 'Select Color',
      fuelTypes: {
        petrol: 'Petrol',
        diesel: 'Diesel',
        electric: 'Electric',
        hybrid: 'Hybrid',
        gas: 'Gas',
        lpg: 'Liquefied Petroleum Gas (LPG)',
        cng: 'Compressed Natural Gas (CNG)',
        hydrogen: 'Hydrogen',
        ethanol: 'Ethanol',
        biodiesel: 'Biodiesel',
        other: 'Other'
      },
      transmissions: {
        manual: 'Manual',
        automatic: 'Automatic',
        semiAutomatic: 'Semi-Automatic'
      },
      conditions: {
        excellent: 'Excellent',
        veryGood: 'Very Good',
        good: 'Good',
        fair: 'Fair',
        poor: 'Poor'
      },
      colors: {
        white: 'White',
        black: 'Black',
        silver: 'Silver',
        gray: 'Gray',
        blue: 'Blue',
        red: 'Red',
        green: 'Green',
        yellow: 'Yellow',
        orange: 'Orange',
        brown: 'Brown',
        purple: 'Purple',
        other: 'Other'
      },
      uploadPhotos: 'Upload Photos',
      maxImages: 'Maximum 10 images',
      submit: 'Publish Listing',
      cancel: 'Cancel',
      success: {
        title: 'Listing Published Successfully!',
        message: 'Your listing is now active and visible to all users.'
      },
      error: 'An error occurred while publishing the listing.',
      validation: {
        required: 'Please fill in all required fields.',
        year: 'Year must be between 1900 and 2025.',
        price: 'Price must be a positive number.'
      }
    },
      selectCondition: 'Select Condition',
      selectColor: 'Select Color',
      fuelTypes: {
        petrol: 'Petrol',
        diesel: 'Diesel',
        electric: 'Electric',
        hybrid: 'Hybrid',
        gas: 'Gas',
        lpg: 'Liquefied Petroleum Gas (LPG)',
        cng: 'Compressed Natural Gas (CNG)',
        hydrogen: 'Hydrogen',
        ethanol: 'Ethanol',
        biodiesel: 'Biodiesel',
        other: 'Other'
      },
      transmissions: {
        manual: 'Manual',
        automatic: 'Automatic',
        semiAutomatic: 'Semi-Automatic'
      },
      conditions: {
        excellent: 'Excellent',
        veryGood: 'Very Good',
        good: 'Good',
        fair: 'Fair',
        poor: 'Poor'
      },
      colors: {
        white: 'White',
        black: 'Black',
        silver: 'Silver',
        gray: 'Gray',
        blue: 'Blue',
        red: 'Red',
        green: 'Green',
        yellow: 'Yellow',
        orange: 'Orange',
        brown: 'Brown',
        purple: 'Purple',
        other: 'Other'
      },
      uploadPhotos: 'Upload Photos',
      maxImages: 'Maximum 10 images',
      submit: 'Publish Listing',
      cancel: 'Cancel',
      success: {
        title: 'Listing Published Successfully!',
        message: 'Your listing is now active and visible to all users.'
      },
      error: 'An error occurred while publishing the listing.',
      validation: {
        required: 'Please fill in all required fields.',
        year: 'Year must be between 1900 and 2025.',
        price: 'Price must be a positive number.'
      }
    },

    // Search
    search: {
      advanced: {
      advanced: {
        title: 'Advanced Search'
      }
    }
  }
};

export type TranslationKey = keyof typeof translations.bg;
export type BulgarianLanguage = 'bg' | 'en';