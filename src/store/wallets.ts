import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';

export interface WalletTransaction {
  id: string;
  type: 'Credit' | 'Debit';
  amount: string;
  balance: string;
  description: string;
  date: string;
}

interface WalletStats {
  availableBalance: number;
  totalCredits: number;
  totalDebits: number;
}

interface WalletsState {
  transactions: WalletTransaction[];
  stats: WalletStats;
  meta: PaginatedResponse<WalletTransaction>['meta'] | null;
  loading: boolean;
  error: string | null;
  fetchTransactions: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  fetchStats: (userType: 'agent' | 'aggregator') => Promise<void>;
}

export const useWalletsStore = create<WalletsState>((set) => ({
  transactions: [],
  stats: {
    availableBalance: 0,
    totalCredits: 0,
    totalDebits: 0
  },
  meta: null,
  loading: false,
  error: null,

  fetchTransactions: async (userType, params) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/wallet/transactions`;
      
      const { data } = await api.get<PaginatedResponse<WalletTransaction>>(endpoint, {
        params
      });
      
      set({ 
        transactions: data.data,
        meta: data.meta,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch wallet transactions',
        loading: false 
      });
    }
  },

  fetchStats: async (userType) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/wallet/stats`;
      
      const { data } = await api.get<{ stats: WalletStats }>(endpoint);
      
      set({ 
        stats: data.stats,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch wallet stats',
        loading: false 
      });
    }
  }
}));