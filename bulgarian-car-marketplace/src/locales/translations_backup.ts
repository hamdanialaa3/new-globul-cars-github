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
      tooManyRequests: 'Твърде много опити. Опитайте по-късно',
      generalError: 'Възникна грешка при влизането',
      googleLoginError: 'Грешка при влизане с Google',
      facebookLoginError: 'Грешка при влизане с Facebook'
    },

    // Register
    register: {
      title: 'Създаване на акаунт',
      subtitle: 'Създайте своя акаунт за да започнете',
      firstName: 'Име',
      firstNamePlaceholder: 'Въведете вашето име',
      lastName: 'Фамилия',
      lastNamePlaceholder: 'Въведете вашата фамилия',
      email: 'Имейл адрес',
      emailPlaceholder: 'Въведете вашия имейл',
      phoneNumber: 'Телефонен номер',
      password: 'Парола',
      passwordPlaceholder: 'Въведете парола',
      confirmPassword: 'Потвърдете паролата',
      confirmPasswordPlaceholder: 'Потвърдете вашата парола',
      city: 'Град',
      cityPlaceholder: 'Въведете вашия град',
      region: 'Област',
      regionPlaceholder: 'Въведете вашата област',
      preferredLanguage: 'Предпочитан език',
      acceptTerms: 'Приемам',
      termsLink: 'условията за ползване',
      acceptPrivacy: 'Приемам',
      privacyLink: 'политиката за поверителност',
      createAccount: 'Създай акаунт',
      creatingAccount: 'Създаване на акаунт...',
      or: 'или',
      continueWithGoogle: 'Продължи с Google',
      continueWithFacebook: 'Продължи с Facebook',
      alreadyHaveAccount: 'Вече имате акаунт? Влезте тук',
      firstNameRequired: 'Името е задължително',
      lastNameRequired: 'Фамилията е задължителна',
      emailRequired: 'Имейл адресът е задължителен',
      emailInvalid: 'Невалиден имейл адрес',
      phoneRequired: 'Телефонният номер е задължителен',
      phoneInvalid: 'Невалиден телефонен номер (използвайте формат +359 XX XXX XXXX)',
      passwordRequired: 'Паролата е задължителна',
      passwordTooShort: 'Паролата трябва да бъде поне 8 символа',
      passwordWeak: 'Паролата трябва да съдържа поне една главна буква, една малка буква и една цифра',
      confirmPasswordRequired: 'Потвърждението на паролата е задължително',
      passwordsNotMatch: 'Паролите не съвпадат',
      cityRequired: 'Градът е задължителен',
      acceptTermsRequired: 'Трябва да приемете условията за ползване',
      acceptPrivacyRequired: 'Трябва да приемете политиката за поверителност',
      emailAlreadyInUse: 'Този имейл адрес вече се използва',
      generalError: 'Възникна грешка при създаването на акаунта',
      googleRegisterError: 'Грешка при регистрация с Google',
      facebookRegisterError: 'Грешка при регистрация с Facebook'
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
        title: 'Открийте своята мечтана кола в България',
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
        showing: 'Showing',
        of: 'of',
        cars: 'cars',
        noResults: 'No cars found matching your criteria',
        tryAdjusting: 'Try adjusting your filters or search terms'
      },
      sort: {
        newest: 'Newest First',
        oldest: 'Oldest First',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        mileageLow: 'Mileage: Low to High',
        mileageHigh: 'Mileage: High to Low'
      }
    },

    // Sell Car Page
    sellCar: {
      title: 'Sell Your Car',
      subtitle: 'Get the best price for your car from verified dealers',
      form: {
        title: 'Car Details',
        subtitle: 'Provide accurate information about your car to get the best offers',
        basicInfo: 'Basic Information',
        make: 'Make',
        selectMake: 'Select Make',
        model: 'Model',
        selectModel: 'Select Model',
        year: 'Year',
        selectYear: 'Select Year',
        mileage: 'Mileage (km)',
        enterMileage: 'Enter mileage',
        price: 'Price (€)',
        enterPrice: 'Enter price',
        currency: 'EUR',
        location: 'Location',
        selectLocation: 'Select Location',
        fuelType: 'Fuel Type',
        selectFuelType: 'Select Fuel Type',
        transmission: 'Transmission',
        selectTransmission: 'Select Transmission',
        condition: 'Condition',
        selectCondition: 'Select Condition',
        color: 'Color',
        selectColor: 'Select Color',
        fuelTypes: {
          petrol: 'Petrol',
          diesel: 'Diesel',
          electric: 'Electric',
          hybrid: 'Hybrid',
          gas: 'Gas',
          lpg: 'LPG',
          cng: 'CNG',
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
      }
    },

    // Search
    search: {
      advanced: {
        title: 'Advanced Search'
      }
    },

    // Login
    login: {
      title: 'Вход в акаунта',
      subtitle: 'Влезте в своя акаунт за да продължите',
      email: 'Имейл адрес',
      emailPlaceholder: 'Въведете вашия имейл',
      password: 'Парола',
      passwordPlaceholder: 'Въведете вашата парола',
      signIn: 'Вход',
      signingIn: 'Влизане...',
      or: 'или',
      continueWithGoogle: 'Продължи с Google',
      continueWithFacebook: 'Продължи с Facebook',
      forgotPassword: 'Забравена парола?',
      createAccount: 'Създай акаунт',
      emailRequired: 'Имейл адресът е задължителен',
      emailInvalid: 'Невалиден имейл адрес',
      passwordRequired: 'Паролата е задължителна',
      passwordTooShort: 'Паролата тряبва да бъде поне 6 символа',
      userNotFound: 'Потребителят не е намерен',
      wrongPassword: 'Грешна парола',
      tooManyRequests: 'Твърде много опити. Опитайте по-късно',
      generalError: 'Възникна грешка при влизането',
      googleLoginError: 'Грешка при влизане с Google',
      facebookLoginError: 'Грешка при влизане с Facebook'
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
        showing: 'Showing',
        of: 'of',
        cars: 'cars',
        noResults: 'No cars found matching your criteria',
        tryAdjusting: 'Try adjusting your filters or search terms'
      },
      sort: {
        newest: 'Newest First',
        oldest: 'Oldest First',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        mileageLow: 'Mileage: Low to High',
        mileageHigh: 'Mileage: High to Low'
      }
    },

    // Sell Car Page
    sellCar: {
      title: 'Sell Your Car',
      subtitle: 'Get the best price for your car from verified dealers',
      form: {
        title: 'Car Details',
        subtitle: 'Provide accurate information about your car to get the best offers',
        basicInfo: 'Basic Information',
        make: 'Make',
        selectMake: 'Select Make',
        model: 'Model',
        selectModel: 'Select Model',
        year: 'Year',
        selectYear: 'Select Year',
        mileage: 'Mileage (km)',
        enterMileage: 'Enter mileage',
        price: 'Price (€)',
        enterPrice: 'Enter price',
        currency: 'EUR',
        location: 'Location',
        selectLocation: 'Select Location',
        fuelType: 'Fuel Type',
        selectFuelType: 'Select Fuel Type',
        transmission: 'Transmission',
        selectTransmission: 'Select Transmission',
        condition: 'Condition',
        selectCondition: 'Select Condition',
        color: 'Color',
        selectColor: 'Select Color',
        fuelTypes: {
          petrol: 'Petrol',
          diesel: 'Diesel',
          electric: 'Electric',
          hybrid: 'Hybrid',
          gas: 'Gas',
          lpg: 'LPG',
          cng: 'CNG',
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
      }
    },

    // Search
    search: {
      advanced: {
        title: 'Advanced Search'
      }
    },

    // Login
    login: {
      title: 'Sign In',
      subtitle: 'Sign in to your account to continue',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign In',
      signingIn: 'Signing In...',
      or: 'or',
      continueWithGoogle: 'Continue with Google',
      continueWithFacebook: 'Continue with Facebook',
      forgotPassword: 'Forgot Password?',
      createAccount: 'Create Account',
      emailRequired: 'Email address is required',
      emailInvalid: 'Invalid email address',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 6 characters',
      userNotFound: 'User not found',
      wrongPassword: 'Wrong password',
      tooManyRequests: 'Too many attempts. Try again later',
      generalError: 'An error occurred during sign in',
      googleLoginError: 'Error signing in with Google',
      facebookLoginError: 'Error signing in with Facebook'
    }
  }
};

export type TranslationKey = keyof typeof translations.bg;
export type BulgarianLanguage = 'bg' | 'en';