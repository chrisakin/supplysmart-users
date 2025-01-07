import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import PreLogin from '../pages/PreLogin';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import EmailVerificationPage from '../pages/EmailVerificationPage';
import { PrivateRoute } from '../components/PrivateRoute';

// Lazy load pages
const AgentDashboard = lazy(() => import('../pages/agent/Dashboard'));
const AggregatorDashboard = lazy(() => import('../pages/aggregator/Dashboard'));
const Agents = lazy(() => import('../pages/Agents'));
const Terminals = lazy(() => import('../pages/Terminals'));
const Transactions = lazy(() => import('../pages/Transactions'));
const Wallets = lazy(() => import('../pages/Wallets'));
const Payment = lazy(() => import('../pages/Payment'));
const Feedback = lazy(() => import('../pages/Feedback'));
const Reports = lazy(() => import('../pages/Reports'));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <PreLogin />,
      },
      {
        path: 'login/:type',
        element: <Login />,
      },
      {
        path: 'signup/:type',
        element: <Signup />,
      },
      {
        path: 'verify-email',
        element: <EmailVerificationPage />,
      },
      {
        path: 'forgot-password/:type',
        element: <ForgotPassword />,
      },
      // Agent Routes
      {
        path: 'agent',
        element: <PrivateRoute userType="agent"><Layout /></PrivateRoute>,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AgentDashboard /> },
          { path: 'terminals', element: <Terminals /> },
          { path: 'transactions', element: <Transactions /> },
          { path: 'wallet', element: <Wallets /> },
          { path: 'payment', element: <Payment /> },
          { path: 'feedback', element: <Feedback /> },
          { path: 'reports', element: <Reports /> },
        ],
      },
      // Aggregator Routes
      {
        path: 'aggregator',
        element: <PrivateRoute userType="aggregator"><Layout /></PrivateRoute>,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AggregatorDashboard /> },
          { path: 'agents', element: <Agents /> },
          { path: 'transactions', element: <Transactions /> },
          { path: 'wallet', element: <Wallets /> },
          { path: 'payment', element: <Payment /> },
          { path: 'feedback', element: <Feedback /> },
          { path: 'reports', element: <Reports /> },
        ],
      },
    ],
  },
]);