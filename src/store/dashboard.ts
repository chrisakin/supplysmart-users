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
  fetchStats: (userType: 'agent' | 'aggregator') => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
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


  fetchStats: async (userType) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/dashboard/stats`;
      
      const { data } = await api.get<{ stats: DashboardStats }>(endpoint);
      
      set({ 
        stats: data.stats,
        loading: false 
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
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
  },
}));