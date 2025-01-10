import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';

interface Report {
  id: string;
  title: string;
  type: string;
  status: 'Completed' | 'Processing' | 'Failed';
  createdAt: string;
  downloadUrl?: string;
}

interface ReportsState {
  reports: Report[];
  meta: PaginatedResponse<Report>['meta'] | null;
  loading: boolean;
  error: string | null;
  requestId: number;
  fetchReports: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  generateReport: (userType: 'agent' | 'aggregator', type: string) => Promise<void>;
}

export const useReportsStore = create<ReportsState>((set, get) => ({
  reports: [],
  meta: null,
  loading: false,
  error: null,
  requestId: 0,

  fetchReports: async (userType, params) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/reports`;
      const { data } = await api.get<PaginatedResponse<Report>>(endpoint, { params });
      
      if (get().requestId === currentRequestId) {
        set({ 
          reports: data.data,
          meta: data.meta,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch reports',
          loading: false 
        });
      }
    }
  },

  generateReport: async (userType, type) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/reports/generate`;
      await api.post(endpoint, { type });
      
      if (get().requestId === currentRequestId) {
        const { data } = await api.get<PaginatedResponse<Report>>(`/${userType}s/reports`);
        set({ 
          reports: data.data,
          meta: data.meta,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to generate report',
          loading: false 
        });
      }
    }
  }
}));