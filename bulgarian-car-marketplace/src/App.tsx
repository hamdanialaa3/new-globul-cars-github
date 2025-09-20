// src/App.tsx
// Main App Component for Bulgarian Car Marketplace

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { TranslationProvider } from './hooks/useTranslation';
import { bulgarianTheme, GlobalStyles } from './styles/theme';
import ErrorBoundary from './components/ErrorBoundary';
import { SkipNavigation } from './components/Accessibility';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AnalyticsTracker from './components/AnalyticsTracker';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CarsPage = React.lazy(() => import('./pages/CarsPage'));
const CarDetailsPage = React.lazy(() => import('./pages/CarDetailsPage'));
const SellCarPage = React.lazy(() => import('./pages/SellCarPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const MessagesPage = React.lazy(() => import('./pages/MessagesPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const ThemeTest = React.lazy(() => import('./components/ThemeTest'));
const BackgroundTest = React.lazy(() => import('./components/BackgroundTest'));
const FullThemeDemo = React.lazy(() => import('./components/FullThemeDemo'));
const EffectsTest = React.lazy(() => import('./components/EffectsTest'));

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header role="banner">
        <Header />
      </header>
      <main
        id="main-content"
        role="main"
        style={{ flex: 1 }}
        tabIndex={-1}
      >
        {children}
      </main>
      <footer role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
};

// Full-screen pages (no header/footer)
const FullScreenLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <main
        id="main-content"
        role="main"
        style={{ minHeight: '100vh' }}
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
};

// Loading component for lazy loaded pages
const PageLoader: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div className="loading-spinner" />
    <p>Loading...</p>
  </div>
);

// App Component
const App: React.FC = () => {
  return (
    <ThemeProvider theme={bulgarianTheme}>
      <ErrorBoundary>
        <TranslationProvider>
          <SkipNavigation />
          <GlobalStyles />
          <Router>
            <AnalyticsTracker />
            <Suspense fallback={<PageLoader />}>
              <Routes>
              {/* Full-screen pages */}
              <Route
                path="/login"
                element={
                  <FullScreenLayout>
                    <LoginPage />
                  </FullScreenLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <FullScreenLayout>
                    <RegisterPage />
                  </FullScreenLayout>
                }
              />

              {/* Pages with header/footer */}
              <Route
                path="/"
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
              />
              <Route
                path="/cars"
                element={
                  <Layout>
                    <CarsPage />
                  </Layout>
                }
              />
              <Route
                path="/cars/:id"
                element={
                  <Layout>
                    <CarDetailsPage />
                  </Layout>
                }
              />
              <Route
                path="/sell-car"
                element={
                  <Layout>
                    <SellCarPage />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <ProfilePage />
                  </Layout>
                }
              />
              <Route
                path="/messages"
                element={
                  <Layout>
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  </Layout>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  </Layout>
                }
              />
              <Route
                path="/admin"
                element={
                  <Layout>
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  </Layout>
                }
              />

              {/* Theme Test Page */}
              <Route
                path="/theme-test"
                element={
                  <Layout>
                    <ThemeTest />
                  </Layout>
                }
              />

              {/* Background Test Page */}
              <Route
                path="/background-test"
                element={
                  <Layout>
                    <BackgroundTest />
                  </Layout>
                }
              />

              {/* Full Theme Demo Page */}
              <Route
                path="/full-demo"
                element={
                  <Layout>
                    <FullThemeDemo />
                  </Layout>
                }
              />

              {/* Effects Test Page */}
              <Route
                path="/effects-test"
                element={
                  <Layout>
                    <EffectsTest />
                  </Layout>
                }
              />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <Layout>
                    <div style={{
                      textAlign: 'center',
                      padding: '4rem 2rem',
                      minHeight: '50vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                      <h2 style={{ marginBottom: '2rem' }}>Страницата не е намерена</h2>
                      <p style={{ marginBottom: '2rem', color: '#666' }}>
                        Страницата, която търсите, не съществува или е преместена.
                      </p>
                      <a
                        href="/"
                        style={{
                          padding: '12px 24px',
                          background: '#1976d2',
                          color: 'white',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 'bold'
                        }}
                      >
                        Към началната страница
                      </a>
                    </div>
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </Router>
        </TranslationProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
