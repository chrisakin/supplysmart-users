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
  fetchReports: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  generateReport: (userType: 'agent' | 'aggregator', type: string) => Promise<void>;
}

export const useReportsStore = create<ReportsState>((set) => ({
  reports: [],
  meta: null,
  loading: false,
  error: null,

  fetchReports: async (userType, params) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/reports`;
      
      const { data } = await api.get<PaginatedResponse<Report>>(endpoint, {
        params
      });
      
      set({ 
        reports: data.data,
        meta: data.meta,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch reports',
        loading: false 
      });
    }
  },

  generateReport: async (userType, type) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/reports/generate`;
      
      await api.post(endpoint, { type });
      
      // Refresh reports list after generating new report
      const { data } = await api.get<PaginatedResponse<Report>>(`/${userType}s/reports`);
      
      set({ 
        reports: data.data,
        meta: data.meta,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate report',
        loading: false 
      });
    }
  }
}));