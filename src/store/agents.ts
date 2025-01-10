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
  requestId: number;
}

export const useAgentsStore = create<AgentsState>((set, get) => ({
  agents: [],
  stats: {
    totalAgents: 0,
    activeAgents: 0,
    inactiveAgents: 0,
  },
  meta: null,
  loading: false,
  error: null,
  requestId: 0,

  fetchAgents: async (params) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const { data } = await api.get<PaginatedResponse<Agent>>('aggregators/payment-history', {
        params,
      });
      
      // Only update state if this is still the most recent request
      if (get().requestId === currentRequestId) {
        set({ 
          agents: data.data,
          meta: data.meta,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch agents',
          loading: false 
        });
      }
    }
  },

  fetchStats: async () => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const { data } = await api.get<{ stats: AgentStats }>('/agents/stats');
      if (get().requestId === currentRequestId) {
        set({ stats: data.stats, loading: false });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch agent stats',
          loading: false 
        });
      }
    }
  },
}));