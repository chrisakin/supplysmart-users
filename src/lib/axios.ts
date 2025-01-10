import axios from 'axios';
import { useAuthStore } from '../store/auth';
import { authApi } from './api/auth';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const userType = localStorage.getItem('userType') as 'agent' | 'aggregator';
        const response = await authApi.refreshToken(userType);
        
        const { token, refreshToken } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Update auth store
        useAuthStore.setState({ token, refreshToken });
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, logout user
        useAuthStore.getState().logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    // Only show toast for non-GET requests
    if (originalRequest.method !== 'get') {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }

    // Always log the error to console
    console.error('API Error:', error);

    return Promise.reject(error.response?.data?.message || 'An error occurred');
  }
);

export default api;