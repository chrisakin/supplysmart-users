import { create } from 'zustand';
import api from '../lib/axios';
import { PaginatedResponse, PaginationParams } from '../types/pagination';

export interface FeedbackMessage {
  id: string;
  message: string;
  createdAt: string;
  isUser: boolean;
}

interface FeedbackState {
  messages: FeedbackMessage[];
  meta: PaginatedResponse<FeedbackMessage>['meta'] | null;
  loading: boolean;
  error: string | null;
  requestId: number;
  fetchMessages: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  sendMessage: (userType: 'agent' | 'aggregator', message: string) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  messages: [],
  meta: null,
  loading: false,
  error: null,
  requestId: 0,

  fetchMessages: async (userType, params) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/feedback`;
      const { data } = await api.get<PaginatedResponse<FeedbackMessage>>(endpoint, { params });
      
      if (get().requestId === currentRequestId) {
        set({ 
          messages: data.data,
          meta: data.meta,
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch messages',
          loading: false 
        });
      }
    }
  },

  sendMessage: async (userType, message) => {
    const currentRequestId = get().requestId + 1;
    set({ requestId: currentRequestId, loading: true, error: null });

    try {
      const endpoint = `/${userType}s/feedback`;
      const { data } = await api.post<{ message: FeedbackMessage }>(endpoint, { message });
      
      if (get().requestId === currentRequestId) {
        set({ 
          messages: [...get().messages, data.message],
          loading: false 
        });
      }
    } catch (error) {
      if (get().requestId === currentRequestId) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to send message',
          loading: false 
        });
      }
    }
  }
}));