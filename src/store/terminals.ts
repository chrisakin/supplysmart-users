import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';

export interface Terminal {
  id: string;
  serialNumber: string;
  model: string;
  location: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  transactions: number;
}

interface TerminalStats {
  totalTerminals: number;
  activeTerminals: number;
  inactiveTerminals: number;
}

interface TerminalsState {
  terminals: Terminal[];
  stats: TerminalStats;
  meta: PaginatedResponse<Terminal>['meta'] | null;
  loading: boolean;
  error: string | null;
  requestId: number;
  fetchTerminals: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  fetchStats: (userType: 'agent' | 'aggregator') => Promise<void>;
}

export const useTerminalsStore = create<TerminalsState>((set, get) => ({
  terminals: [],
  stats: {
    totalTerminals: 0,
    activeTerminals: 0,
    inactiveTerminals: 0
  },
  meta: null,
  loading: false,
  error: null,
  requestId: 0,

  fetchTerminals: async (userType, params) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/terminals`;
      const { data } = await api.get<PaginatedResponse<Terminal>>(endpoint, { params });
      
      if (get().requestId === currentRequestId) {
        set({ 
          terminals: data.data,
          meta: data.meta,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch terminals',
          loading: false 
        });
      }
    }
  },

  fetchStats: async (userType) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/terminals/stats`;
      const { data } = await api.get<{ stats: TerminalStats }>(endpoint);
      
      if (get().requestId === currentRequestId) {
        set({ 
          stats: data.stats,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch terminal stats',
          loading: false 
        });
      }
    }
  }
}));