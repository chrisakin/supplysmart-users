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
  requestId: number;
  fetchPayments: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  fetchStats: (userType: 'agent' | 'aggregator') => Promise<void>;
}

export const usePaymentsStore = create<PaymentsState>((set, get) => ({
  payments: [],
  stats: {
    totalPayments: 0,
    completedPayments: 0,
    failedPayments: 0
  },
  meta: null,
  loading: false,
  error: null,
  requestId: 0,

  fetchPayments: async (userType, params) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/payment-history`;
      const { data } = await api.get<PaginatedResponse<Payment>>(endpoint, { params });
      
      if (get().requestId === currentRequestId) {
        set({ 
          payments: data.data,
          meta: data.meta,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch payments',
          loading: false 
        });
      }
    }
  },

  fetchStats: async (userType) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/payment/stats`;
      const { data } = await api.get<{ stats: PaymentStats }>(endpoint);
      
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
            totalPayments: 0,
            completedPayments: 0,
            failedPayments: 0
          },
          loading: false 
        });
      }
    }
  }
}));