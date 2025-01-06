const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const api = {
  login: {
    agent: async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${API_ENDPOINT}/agent/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return response.json();
    },
    
    aggregator: async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${API_ENDPOINT}/aggregator/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return response.json();
    },
  },
};