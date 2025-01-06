import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';
import { Agent, AgentStats } from '../types/store';

interface AgentsState {
  agents: Agent[];
  stats: AgentStats;
  meta: PaginatedResponse<Agent>['meta'] | null;
  loading: boolean;
  error: string | null;
  fetchAgents: (params: PaginationParams) => Promise<void>;
  fetchStats: () => Promise<void>;
}

export const useAgentsStore = create<AgentsState>((set) => ({
  agents: [],
  stats: {
    totalAgents: 0,
    activeAgents: 0,
    inactiveAgents: 0,
  },
  meta: null,
  loading: false,
  error: null,

  fetchAgents: async (params) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get<PaginatedResponse<Agent>>('/agents', {
        params,
      });
      
      set({ 
        agents: data.data,
        meta: data.meta,
        loading: false 
      });
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
      const { data } = await api.get<{ stats: AgentStats }>('/agents/stats');
      set({ stats: data.stats, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch agent stats',
        loading: false 
      });
    }
  },
}));