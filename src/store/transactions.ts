import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';

interface Transaction {
  _id: string;
  transactionReference: string;
  recipientAccountName: string;
  recipientBank: string;
  recipientAccountNumber: string;
  transactionAmount: string;
  transactionType: string;
  transactionStatus: string;
  transactionDate: string;
  transactionDescription: string;
  transactionId: string;
  transactionTransferCode: string;
  transactionFailureReason: string | null;
}

interface TransactionStats {
  totalAmount: number;
  successfulTransactions: number;
  failedTransactions: number;
}

interface TransactionsState {
  transactions: Transaction[];
  stats: TransactionStats;
  meta: PaginatedResponse<Transaction>['meta'] | null;
  loading: boolean;
  error: string | null;
  requestId: number;
  fetchTransactions: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  fetchStats: (userType: 'agent' | 'aggregator') => Promise<void>;
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  transactions: [],
  stats: {
    totalAmount: 0,
    successfulTransactions: 0,
    failedTransactions: 0
  },
  meta: null,
  loading: false,
  error: null,
  requestId: 0,

  fetchTransactions: async (userType, params) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/transaction-history`;
      const { data } = await api.get(endpoint, { params });
      
      if (get().requestId === currentRequestId) {
        set({ 
          transactions: data.data.transactionHistory,
          meta: {
            total: data.data.total,
            currentPage: data.data.pagination.currentPage || 1,
            lastPage: data.data.pagination.lastPage || 1,
            perPage: data.data.pagination.perPage || 10
          },
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch transactions',
          loading: false 
        });
      }
    }
  },

  fetchStats: async (userType) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/transactions/stats`;
      const { data } = await api.get<{ stats: TransactionStats }>(endpoint);
      
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
            totalAmount: 0,
            successfulTransactions: 0,
            failedTransactions: 0
          },
          loading: false 
        });
      }
    }
  }
}));