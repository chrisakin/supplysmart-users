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
  fetchMessages: (userType: 'agent' | 'aggregator', params: PaginationParams) => Promise<void>;
  sendMessage: (userType: 'agent' | 'aggregator', message: string) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  messages: [],
  meta: null,
  loading: false,
  error: null,

  fetchMessages: async (userType, params) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/feedback`;
      
      const { data } = await api.get<PaginatedResponse<FeedbackMessage>>(endpoint, {
        params
      });
      
      set({ 
        messages: data.data,
        meta: data.meta,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch messages',
        loading: false 
      });
    }
  },

  sendMessage: async (userType, message) => {
    try {
      set({ loading: true, error: null });
      const endpoint = `/${userType}s/feedback`;
      
      const { data } = await api.post<{ message: FeedbackMessage }>(endpoint, { message });
      
      set({ 
        messages: [...get().messages, data.message],
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to send message',
        loading: false 
      });
    }
  }
}));