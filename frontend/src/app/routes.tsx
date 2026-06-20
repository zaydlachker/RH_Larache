import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { PublicLayout2 } from './layouts/PublicLayout2';
import { PublicPortal } from './pages/PublicPortal';
import { PublicPortal2 } from './pages/PublicPortal2';
import ConcoursPage from './pages/Concours';
import AnnoncesPage from './pages/AnnoncesPage';
import ActualitesPage from './pages/ActualitesPage';
import { Login } from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import { CandidatureForm } from './pages/CandidatureForm';
import { ProfilePage } from './pages/Profile';
import { StaticPage } from './pages/StaticPage';
import AdminDashboard from './pages/AdminDashboard';
import FonctionnaireDashboard from './pages/FonctionnaireDashboard';
import FonctionnaireLogin from './pages/FonctionnaireLogin';
import StagiaireLogin from './pages/StagiaireLogin';
import StagiaireDashboard from './pages/StagiaireDashboard';
import StagiaireRegister from './pages/StagiaireRegister';
import SelectPage from './pages/SelectPage';
import SelectAdminPage from './pages/SelectAdminPage';
import PresidentLogin from './pages/PresidentLogin';
import PresidentDashboard from './pages/PresidentDashboard';
import AnnonceDetailsPage from './pages/AnnonceDetailsPage';
import ActualiteDetailsPage from './pages/ActualiteDetailsPage';



export const router = createBrowserRouter([
  {
    path: '/2',
    element: <PublicLayout2 />,
    children: [
      { index: true, element: <PublicPortal2 /> },
      { path: 'concours', element: <ConcoursPage /> },
      { path: 'annonces', element: <AnnoncesPage /> },
      { path: 'annonces/:id', element: <AnnonceDetailsPage /> },

      { path: 'actualites', element: <ActualitesPage /> },
      { path: 'actualites/:id', element: <ActualiteDetailsPage /> },

      { path: 'postuler/:id', element: <CandidatureForm /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'commune', element: <StaticPage /> },
      { path: 'presidence', element: <StaticPage /> },
      { path: 'sessions', element: <StaticPage /> },
      { path: 'appels-offre', element: <StaticPage /> },
      { path: 'projets', element: <StaticPage /> },
      { path: 'consultation', element: <StaticPage /> },
      { path: 'ville', element: <StaticPage /> },
      { path: 'jardins', element: <StaticPage /> },
      { path: 'transport', element: <StaticPage /> },
      { path: 'sport', element: <StaticPage /> },
      { path: 'entreprenariat', element: <StaticPage /> },
      { path: 'sante', element: <StaticPage /> },
      { path: 'visite', element: <StaticPage /> },
      { path: 'associative', element: <StaticPage /> },
      { path: 'commune-en-ligne', element: <StaticPage /> },
      { path: 'bureau-digital', element: <StaticPage /> },
      { path: 'chikaya', element: <StaticPage /> },
      { path: 'allo-mouatine', element: <StaticPage /> },
      { path: 'watiqa', element: <StaticPage /> },
      { path: 'rokhas', element: <StaticPage /> },
      { path: 'marches-publics', element: <StaticPage /> },
      { path: 'chafafiya', element: <StaticPage /> },
    ],
  },
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <PublicPortal /> },
      { path: 'concours', element: <ConcoursPage /> },
      { path: 'annonces', element: <AnnoncesPage /> },
      { path: 'annonces/:id', element: <AnnonceDetailsPage /> },

      { path: 'actualites', element: <ActualitesPage /> },
      { path: 'actualites/:id', element: <ActualiteDetailsPage /> },

      { path: 'postuler/:id', element: <CandidatureForm /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'commune', element: <StaticPage /> },
      { path: 'presidence', element: <StaticPage /> },
      { path: 'sessions', element: <StaticPage /> },
      { path: 'appels-offre', element: <StaticPage /> },
      { path: 'projets', element: <StaticPage /> },
      { path: 'consultation', element: <StaticPage /> },
      { path: 'ville', element: <StaticPage /> },
      { path: 'jardins', element: <StaticPage /> },
      { path: 'transport', element: <StaticPage /> },
      { path: 'sport', element: <StaticPage /> },
      { path: 'entreprenariat', element: <StaticPage /> },
      { path: 'sante', element: <StaticPage /> },
      { path: 'visite', element: <StaticPage /> },
      { path: 'associative', element: <StaticPage /> },
      { path: 'commune-en-ligne', element: <StaticPage /> },
      { path: 'bureau-digital', element: <StaticPage /> },
      { path: 'chikaya', element: <StaticPage /> },
      { path: 'allo-mouatine', element: <StaticPage /> },
      { path: 'watiqa', element: <StaticPage /> },
      { path: 'rokhas', element: <StaticPage /> },
      { path: 'marches-publics', element: <StaticPage /> },
      { path: 'chafafiya', element: <StaticPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/president',
    element: <PresidentDashboard />,
  },
  {
    path: '/dashboard/fonctionnaire',
    element: <FonctionnaireDashboard />,
  },
  {
    path: '/dashboard/stagiaire',
    element: <StagiaireDashboard />,
  },
  {
    path: '/selecte',
    element: <SelectPage />,
  },
  {
    path: '/login/fonctionnaire',
    element: <FonctionnaireLogin />,
  },
  {
    path: '/login/stagiaire',
    element: <StagiaireLogin />,
  },
  {
    path: '/login/registerstagiaire',
    element: <StagiaireRegister />,
  },
  {
    path: '/login/stagiere',
    element: <Navigate to="/login/stagiaire" replace />,
  },
  {
    path: '/fonctionnaire',
    element: <Navigate to="/login/fonctionnaire" replace />,
  },
  {
    path: '/stagiaire',
    element: <Navigate to="/login/stagiaire" replace />,
  },
  {
    path: '/selecteadmin',
    element: <SelectAdminPage />,
  },
  {
    path: '/login/admin',
    element: <AdminLogin />,
  },
  {
    path: '/login/president',
    element: <PresidentLogin />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Login />,
  },
]);
