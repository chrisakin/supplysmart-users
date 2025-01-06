import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import PreLogin from '../pages/PreLogin';
import Login from '../pages/Login';

// Lazy load other pages that aren't part of the critical auth flow
const Dashboard = lazy(() => import('../pages/Dashboard'));
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
        path: 'dashboard',
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'terminals', element: <Terminals /> },
          { path: 'transactions', element: <Transactions /> },
          { path: 'wallets', element: <Wallets /> },
          { path: 'payment', element: <Payment /> },
          { path: 'feedback', element: <Feedback /> },
          { path: 'reports', element: <Reports /> },
        ],
      },
    ],
  },
]);