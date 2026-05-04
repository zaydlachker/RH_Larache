import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getStoredUser } from '../lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: string;
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const location = useLocation();
  const user = getStoredUser();
  const isAuthed = isAuthenticated();

  if (!isAuthed) {
    // Redirect to login but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    // If user is logged in but doesn't have the required role, redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
