import { Feedback, PaginatedResponse } from '../types';  // Ensure Feedback type is updated in types
import apiClient from '../client';

export const feedbackService = {
  getAll: async () => {
    const { data } = await apiClient.get<PaginatedResponse<Feedback>>('/feedback');
    return data;
  },

  getByProduct: async (productId: string) => {
    const { data } = await apiClient.get<Feedback[]>(`/feedback/product/${productId}`);
    return data;
  },

  submit: async (feedback: Omit<Feedback, 'id' | 'createdAt'>) => {
    const { data } = await apiClient.post<Feedback>('/feedback', feedback);
    return data;
  },
};
