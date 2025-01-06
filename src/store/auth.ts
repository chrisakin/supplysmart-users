import { create } from 'zustand';
import { AuthState } from '../types/store';
import { authApi } from '../lib/api/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (type, email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await authApi.login(type, { email, password });
      
      localStorage.setItem('token', response.token);
      set({ 
        user: { ...response.user, type },
        token: response.token,
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
    set({ user: null, token: null });
  },
}));