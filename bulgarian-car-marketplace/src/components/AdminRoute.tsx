// src/components/AdminRoute.tsx
// Admin Route Component for Bulgarian Car Marketplace

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin (you might want to check this from Firestore or custom claims)
  // For now, we'll check if the user's email is in a list of admin emails
  const adminEmails = [
    'admin@globulcars.bg',
    'hamda@example.com', // Add your admin emails here
  ];

  const isAdmin = adminEmails.includes(user.email || '');

  // Redirect to home if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render children if user is authenticated and is admin
  return <>{children}</>;
};

export default AdminRoute;