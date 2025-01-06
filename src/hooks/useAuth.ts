import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const handleLogin = async (
    type: 'agent' | 'aggregator',
    credentials: { email?: string; password?: string; phoneNumber?: string; pin?: string }
  ) => {
    try {
      await login(type, credentials);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return { login: handleLogin, loading, error };
}