import { Category } from '../types';
import apiClient from '../client';

export const categoryService = {
  getAll: async () => {
    const { data } = await apiClient.get<Category[]>('/category');
    return data;
  },

};
