import { Customer, PaginatedResponse } from '../types';
import apiClient from '../client';

export const customerService = {
  getAll: async () => {
    const { data } = await apiClient.get<PaginatedResponse<Customer>>('/customers');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Customer>(`/customers/${id}`);
    return data;
  },

  create: async (customer: Omit<Customer, 'id' | 'createdAt' | 'totalOrders' | 'totalSpent'>) => {
    const { data } = await apiClient.post<Customer>('/customers', customer);
    return data;
  },

  update: async (id: string, customer: Partial<Customer>) => {
    const { data } = await apiClient.put<Customer>(`/customers/${id}`, customer);
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/customers/${id}`);
  },
};