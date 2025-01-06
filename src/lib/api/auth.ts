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

  forgotPassword: async (email: string, type: 'agent' | 'aggregator') => {
    const { data } = await api.post(`${type}s/forgot-password`, { email });
    return data;
  },
};