import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function RootLayout() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
}