import api from '../axios';

interface LoginResponse {
  status: string;
  data: {
    token: string;
    refreshToken: string;
    'agentId or aggregatorId': string;
  };
}

interface SignupResponse {
  message: string;
  requiresVerification: boolean;
}

interface LoginCredentials {
  phoneNumber: string;
  pin: string;
}

export const authApi = {
  login: async (
    type: 'agent' | 'aggregator',
    credentials: LoginCredentials
  ): Promise<LoginResponse> => {
    const { data } = await api.post(`/${type}s/login`, credentials);
    return data;
  },

  refreshToken: async (type: 'agent' | 'aggregator') => {
    const refreshToken = localStorage.getItem('refreshToken');
    const { data } = await api.post(`/${type}s/refresh/token`, { refreshToken });
    return data;
  },

  signup: async (type: 'agent' | 'aggregator', formData: FormData): Promise<SignupResponse> => {
    const { data } = await api.post(`/${type}s/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  verifyEmail: async (type: 'agent' | 'aggregator', otp: string) => {
    const { data } = await api.post(`/${type}s/auth/verify/${otp}`);
    return data;
  },

  forgotPassword: async (email: string, type: 'agent' | 'aggregator') => {
    const { data } = await api.post(`/${type}s/forgot-password`, { email });
    return data;
  },
};