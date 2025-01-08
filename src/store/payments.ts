import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';

export interface Payment {
  id: string;
  reference: string;
  method: string;
  amount: string;
  status: 'Completed' | 'Failed' | 'Pending';
  date: string;
  recipient: string;
}

interface PaymentStats {
  totalPayments: number;
  completedPayments: number;
  failedPayments: number;
}

interface PaymentsState {
  payments: Payment[];
  stats: PaymentStats;
  meta: PaginatedResponse<Payment>['meta'] | null;
  loading: boolean;
  error: string | null;
  fetchPayments: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  fetchStats: (userType: 'agent' | 'aggregator') => Promise<void>;
}

export const usePaymentsStore = create<PaymentsState>((set) => ({
  payments: [],
  stats: {
    totalPayments: 0,
    completedPayments: 0,
    failedPayments: 0
  },
  meta: null,
  loading: false,
  error: null,

  fetchPayments: async (userType, params) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/payment-history`;
      
      const { data } = await api.get<PaginatedResponse<Payment>>(endpoint, {
        params
      });
      
      set({ 
        payments: data.data,
        meta: data.meta,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch payments',
        loading: false 
      });
    }
  },

  fetchStats: async (userType) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/payment/stats`;
      
      const { data } = await api.get<{ stats: PaymentStats }>(endpoint);
      
      set({ 
        stats: data.stats,
        loading: false 
      });
    } catch (error) {
      set({ 
        stats: {
          totalPayments: 0,
          completedPayments: 0,
          failedPayments: 0
        },
        loading: false 
      });
    }
  }
}));