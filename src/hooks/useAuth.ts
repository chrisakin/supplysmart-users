import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const handleLogin = async (type: 'agent' | 'aggregator', email: string, password: string) => {
    try {
      await login(type, email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error is already handled in the store
      console.error('Login failed:', err);
    }
  };

  return { login: handleLogin, loading, error };
}