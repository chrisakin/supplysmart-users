import { create } from 'zustand';
import { authApi } from '../lib/api/auth';

interface User {
  id: string;
  type: 'agent' | 'aggregator';
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  login: (type: 'agent' | 'aggregator', credentials: any) => Promise<void>;
  logout: () => void;
}

// Initialize user from localStorage
const getInitialUser = (): User | null => {
  const userType = localStorage.getItem('userType') as 'agent' | 'aggregator';
  const userId = localStorage.getItem('userId');
  
  if (userType && userId) {
    return {
      id: userId,
      type: userType
    };
  }
  
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,

  login: async (type, credentials) => {
    try {
      set({ loading: true, error: null });
      const response = await authApi.login(type, credentials);
      
      const { token, refreshToken, ['agentId or aggregatorId']: id } = response.data;
      
      // Store all necessary data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userType', type);
      localStorage.setItem('userId', id);
      
      set({ 
        user: { id, type },
        token,
        refreshToken,
        loading: false 
      });
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
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    set({ user: null, token: null, refreshToken: null });
  },
}));