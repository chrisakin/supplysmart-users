import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { authApi } from '../lib/api/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { login: storeLogin, loading, error } = useAuthStore();

  const handleLogin = async (
    type: 'agent' | 'aggregator',
    credentials: { email?: string; password?: string; phoneNumber?: string; pin?: string }
  ) => {
    try {
      const response: { requiresVerification?: boolean } = await storeLogin(type, credentials);
      if (response?.requiresVerification) {
        navigate('/verify-email', { state: { email: credentials.email, type } });
      } else {
        navigate(`/${type}/dashboard`);
      }
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const handleSignup = async (
    type: 'agent' | 'aggregator',
    formData: FormData
  ) => {
    try {
      const response: { requiresVerification?: boolean  } = await authApi.signup(type, formData);
      
      // If email verification is required
      if (response.requiresVerification) {
        const email = formData.get('email') as string;
        navigate('/verify-email', { state: { email, type } });
      } else {
        // If no verification required, log the user in directly
        const credentials = type === 'agent' 
          ? {
              phoneNumber: formData.get('phoneNumber') as string,
              pin: formData.get('pin') as string
            }
          : {
              email: formData.get('email') as string,
              password: formData.get('password') as string
            };
        
        await handleLogin(type, credentials);
      }
    } catch (err) {
      console.error('Signup failed:', err);
      throw err;
    }
  };

  return { login: handleLogin, signup: handleSignup, loading, error };
}