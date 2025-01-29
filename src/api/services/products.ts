import { Product, PaginatedResponse } from '../types';
import apiClient from '../client';

export const productService = {
  getAll: async () => {
    const { data } = await apiClient.get<PaginatedResponse<Product>>('/products');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  create: async (product: Omit<Product, 'id' | 'createdAt'>) => {
    const { data } = await apiClient.post<Product>('/products', product);
    return data;
  },

  update: async (id: string, product: Partial<Product>) => {
    const { data } = await apiClient.put<Product>(`/products/${id}`, product);
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/products/${id}`);
  },
};