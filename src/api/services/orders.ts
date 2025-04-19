import { Order, PaginatedResponse } from '../types';
import apiClient from '../client';

export const orderService = {
  getAll: async () => {
    const { data } = await apiClient.get<PaginatedResponse<Order>>('/orders/all'); // Updated route
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Order>(`/orders/${id}`);
    return data;
  },

  create: async (order: Omit<Order, '_id' | 'createdAt'>) => {
    const { data } = await apiClient.post<Order>('/orders', order);
    return data;
  },

  updateStatus: async (id: string, status: Order['status']) => {
    const { data } = await apiClient.put<Order>(`/orders/${id}/status`, { status }); // Updated route
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/orders/${id}`);
  },

  trackOrder: async (trackingNumber: string) => {
    const { data } = await apiClient.get<Order>(`/orders/track-order/${trackingNumber}`); // Updated route
    return data;
  },

  requestOrderCancellation: async (orderId: string) => {
    const { data } = await apiClient.put<Order>(`/orders/${orderId}/request-cancel`); // Updated route
    return data;
  },

  cancelOrder: async (orderId: string) => {
    const { data } = await apiClient.put<Order>(`/orders/${orderId}/cancel`); // Updated route
    return data;
  },
};
