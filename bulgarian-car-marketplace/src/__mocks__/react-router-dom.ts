// src/__mocks__/react-router-dom.ts
// Mock for react-router-dom

import React from 'react';

const mockReactRouterDom = {
  BrowserRouter: ({ children }: any) => children,
  Routes: ({ children }: any) => children,
  Route: ({ element }: any) => element,
  Link: ({ children, to }: any) => React.createElement('a', { href: to }, children),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useParams: () => ({}),
};

export default mockReactRouterDom;