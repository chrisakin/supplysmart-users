import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse } from '../types/pagination';
import { Transaction, DashboardStats } from '../types/store';

interface DashboardState {
  transactions: Transaction[];
  stats: DashboardStats;
  meta: PaginatedResponse<Transaction>['meta'] | null;
  loading: boolean;
  error: string | null;
  requestId: number;
  fetchStats: (userType: 'agent' | 'aggregator') => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  transactions: [],
  stats: {
    totalRevenue: 0,
    totalCommission: 0,
    successfulTransactions: '0',
    failedTransactions: '0',
  },
  meta: null,
  loading: false,
  error: null,
  requestId: 0,

  fetchStats: async (userType) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/dashboard/stats`;
      const { data } = await api.get<{ stats: DashboardStats }>(endpoint);
      
      if (get().requestId === currentRequestId) {
        set({ 
          stats: data.stats,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          stats: {
            totalRevenue: 0,
            totalCommission: 0,
            successfulTransactions: '0',
            failedTransactions: '0',
          },
          loading: false 
        });
      }
    }
  },
}));