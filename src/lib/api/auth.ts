interface AgentLoginCredentials {
  phoneNumber: string;
  pin: string;
}

interface AggregatorLoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    phoneNumber?: string;
    email?: string;
    type: 'agent' | 'aggregator';
  };
}

export const authApi = {
  login: async (
    type: 'agent' | 'aggregator', 
    credentials: AgentLoginCredentials | AggregatorLoginCredentials
  ): Promise<LoginResponse> => {
    const response = await fetch(`/api/v1/${type}s/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },
};