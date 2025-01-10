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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
      if (isRefreshing) {
        // If token refresh is in progress, add request to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const userType = localStorage.getItem('userType') as 'agent' | 'aggregator';
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!userType || !refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await authApi.refreshToken(userType);
        const { token, refreshToken: newRefreshToken } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        // Update auth store
        useAuthStore.setState({ token, refreshToken: newRefreshToken });
        
        // Update authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        processQueue(null, token);
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Clear auth state and redirect to login
        useAuthStore.getState().logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Only show toast for non-GET requests
    if (originalRequest.method !== 'get') {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api;