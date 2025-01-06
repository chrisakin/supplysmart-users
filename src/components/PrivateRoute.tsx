import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  userType: 'agent' | 'aggregator';
}

export function PrivateRoute({ children, userType }: PrivateRouteProps) {
  const { user, token } = useAuthStore();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.type !== userType) {
    return <Navigate to={`/${user.type}/dashboard`} replace />;
  }

  return <>{children}</>;
}