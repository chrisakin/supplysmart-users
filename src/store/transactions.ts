import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';

export interface Transaction {
  id: string;
  reference: string;
  amount: number;
  type: string;
  status: 'Successful' | 'Failed' | 'Pending';
  date: string;
  customer: string;
}

interface TransactionStats {
  totalTransactions: number;
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
  fetchTransactions: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: [],
  stats: {
    totalTransactions: 0,
    totalAmount: 0,
    successfulTransactions: 0,
    failedTransactions: 0
  },
  meta: null,
  loading: false,
  error: null,

  fetchTransactions: async (userType, params) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/transaction-history`;
      
      const { data } = await api.get<PaginatedResponse<Transaction>>(endpoint, {
        params
      });
      
      // Calculate stats from the transactions
      const stats = {
        totalTransactions: data.meta.total,
        totalAmount: data.data.reduce((sum, tx) => sum + tx.amount, 0),
        successfulTransactions: data.data.filter(tx => tx.status === 'Successful').length,
        failedTransactions: data.data.filter(tx => tx.status === 'Failed').length
      };

      set({ 
        transactions: data.data,
        stats,
        meta: data.meta,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch transactions',
        loading: false 
      });
    }
  },
}));