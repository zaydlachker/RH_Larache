import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { PublicPortal } from './pages/PublicPortal';
import ConcoursPage from './pages/Concours';
import AnnoncesPage from './pages/AnnoncesPage';
import ActualitesPage from './pages/ActualitesPage';
import { Login } from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import { CandidatureForm } from './pages/CandidatureForm';
import { ProfilePage } from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import FonctionnaireDashboard from './pages/FonctionnaireDashboard';
import FonctionnaireLogin from './pages/FonctionnaireLogin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <PublicPortal /> },
      { path: 'concours', element: <ConcoursPage /> },
      { path: 'annonces', element: <AnnoncesPage /> },
      { path: 'actualites', element: <ActualitesPage /> },
      { path: 'postuler/:id', element: <CandidatureForm /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/fonctionnaire',
    element: <FonctionnaireDashboard />,
  },
  {
    path: '/login/fonctionnaire',
    element: <FonctionnaireLogin />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/login/admin',
    element: <AdminLogin />,
  },
  {
    path: '/register',
    element: <Login />,
  },
]);
