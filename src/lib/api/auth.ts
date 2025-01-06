import api from '../axios';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email?: string;
    phoneNumber?: string;
    type: 'agent' | 'aggregator';
  };
}

interface AgentLoginCredentials {
  phoneNumber: string;
  pin: string;
}

interface AggregatorLoginCredentials {
  email: string;
  password: string;
}

export const authApi = {
  login: async (
    type: 'agent' | 'aggregator',
    credentials: AgentLoginCredentials | AggregatorLoginCredentials
  ): Promise<LoginResponse> => {
    const { data } = await api.post(`${type}s/login`, credentials);
    return data;
  },

  signup: async (type: 'agent' | 'aggregator', formData: FormData) => {
    const { data } = await api.post(`${type}s/signup`, formData);
    return data;
  },

  verifyEmail: async (type: 'agent' | 'aggregator', otp: string) => {
    const { data } = await api.post(`${type}s/auth/verify/${otp}`);
    return data;
  },

  forgotPassword: async (email: string, type: 'agent' | 'aggregator') => {
    const { data } = await api.post(`${type}s/forgot-password`, { email });
    return data;
  },
};