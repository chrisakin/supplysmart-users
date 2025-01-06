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
      navigate(`/${type}/dashboard`);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleSignup = async (
    type: 'agent' | 'aggregator',
    formData: { fullName: string; phoneNumber: string; email: string; state: string; city: string; bvn: string; pin: string; password: string; proofOfAddress: File | null; passportPhoto: File | null; }
  ) => {
    try {
      // Perform signup logic here
      navigate(`/${type}/dashboard`);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return { login: handleLogin, signup: handleSignup, loading, error };
}