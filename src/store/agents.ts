import { create } from 'zustand';
import { AgentsState } from '../types/store';
import { API_ENDPOINT } from '../lib/config';

export const useAgentsStore = create<AgentsState>((set) => ({
  agents: [],
  stats: {
    totalAgents: 0,
    activeAgents: 0,
    inactiveAgents: 0,
  },
  loading: false,
  error: null,

  fetchAgents: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_ENDPOINT}/agents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch agents');
      
      const data = await response.json();
      set({ agents: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch agents',
        loading: false 
      });
    }
  },

  fetchStats: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_ENDPOINT}/agents/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch agent stats');
      
      const data = await response.json();
      set({ stats: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch agent stats',
        loading: false 
      });
    }
  },
}));