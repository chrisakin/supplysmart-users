import { create } from 'zustand';
import { authApi } from '../lib/api/auth';

interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  type: 'agent' | 'aggregator';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (type: 'agent' | 'aggregator', credentials: any) => Promise<{ requiresVerification?: boolean }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (type: 'agent' | 'aggregator', credentials: { email: string; password: string } | { phoneNumber: string; pin: string }): Promise<{ requiresVerification?: boolean }> => {
    try {
      set({ loading: true, error: null });
      const response = await authApi.login(type, credentials);
      
      localStorage.setItem('token', response.token);
      set({ 
        user: response.user,
        token: response.token,
        loading: false 
      });
      return { requiresVerification: response.requiresVerification };
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        loading: false 
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));