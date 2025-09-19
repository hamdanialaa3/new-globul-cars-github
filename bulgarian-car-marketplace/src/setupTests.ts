// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Firebase services
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock('firebase/messaging', () => ({
  getMessaging: jest.fn(() => ({})),
  onMessage: jest.fn(),
  getToken: jest.fn(() => Promise.resolve('mock-token')),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      id: 'mock-doc-id',
      set: jest.fn(() => Promise.resolve()),
      update: jest.fn(() => Promise.resolve()),
      get: jest.fn(() => Promise.resolve({
        exists: true,
        data: jest.fn(() => ({ id: 'mock-doc-id' })),
        id: 'mock-doc-id'
      })),
      delete: jest.fn(() => Promise.resolve()),
    })),
    add: jest.fn(() => Promise.resolve({ id: 'mock-doc-id' })),
    where: jest.fn(() => ({
      orderBy: jest.fn(() => ({
        limit: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve({
            docs: [],
            forEach: jest.fn(),
          })),
        })),
      })),
    })),
    orderBy: jest.fn(() => ({
      limit: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({
          docs: [],
          forEach: jest.fn(),
        })),
      })),
    })),
    onSnapshot: jest.fn(() => jest.fn()),
  })),
  doc: jest.fn(() => ({
    id: 'mock-doc-id',
    set: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
    get: jest.fn(() => Promise.resolve({
      exists: true,
      data: jest.fn(() => ({ id: 'mock-doc-id' })),
      id: 'mock-doc-id'
    })),
    delete: jest.fn(() => Promise.resolve()),
  })),
  getDoc: jest.fn(() => Promise.resolve({
    exists: true,
    data: jest.fn(() => ({ id: 'mock-doc-id' })),
    id: 'mock-doc-id'
  })),
  setDoc: jest.fn(() => Promise.resolve()),
  updateDoc: jest.fn(() => Promise.resolve()),
  deleteDoc: jest.fn(() => Promise.resolve()),
  query: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({
      docs: [],
      forEach: jest.fn(),
    })),
  })),
  where: jest.fn(() => ({
    orderBy: jest.fn(() => ({
      limit: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({
          docs: [],
          forEach: jest.fn(),
        })),
      })),
    })),
  })),
  orderBy: jest.fn(() => ({
    limit: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({
        docs: [],
        forEach: jest.fn(),
      })),
    })),
  })),
  limit: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({
      docs: [],
      forEach: jest.fn(),
    })),
  })),
  onSnapshot: jest.fn(() => jest.fn()),
  addDoc: jest.fn(() => Promise.resolve({ id: 'mock-doc-id' })),
  serverTimestamp: jest.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({})),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));

// Mock window methods for FCM
Object.defineProperty(window, 'Notification', {
  value: {
    permission: 'granted',
    requestPermission: jest.fn(() => Promise.resolve('granted')),
  },
  writable: true,
});

Object.defineProperty(window, 'navigator', {
  value: {
    ...window.navigator,
    serviceWorker: {
      register: jest.fn(() => Promise.resolve({})),
      ready: Promise.resolve({
        showNotification: jest.fn(),
      }),
    },
  },
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock FCM service
jest.mock('./services/fcm-service', () => ({
  fcmService: {
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('mock-fcm-token')),
    onMessage: jest.fn(),
    sendNotification: jest.fn(() => Promise.resolve()),
    getNotifications: jest.fn(() => []),
    markAsRead: jest.fn(),
    clearAll: jest.fn(),
  },
  PushNotification: {},
}));

// Mock Firebase config
jest.mock('./firebase', () => ({
  bulgarianAuthService: {
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    getCurrentUser: jest.fn(() => null),
    onAuthStateChange: jest.fn(),
  },
  db: {},
  storage: {},
}));

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning:') &&
      args[0].includes('ReactDOMTestUtils')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
