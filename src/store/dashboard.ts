import { create } from 'zustand';
import { DashboardState } from '../types/store';
import { API_ENDPOINT } from '../lib/config';

export const useDashboardStore = create<DashboardState>((set) => ({
  transactions: [],
  stats: {
    totalRevenue: 0,
    totalCommission: 0,
    successfulTransactions: 0,
    failedTransactions: 0,
  },
  loading: false,
  error: null,

  fetchTransactions: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_ENDPOINT}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch transactions');
      
      const data = await response.json();
      set({ transactions: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch transactions',
        loading: false 
      });
    }
  },

  fetchStats: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_ENDPOINT}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const data = await response.json();
      set({ stats: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
        loading: false 
      });
    }
  },
}));