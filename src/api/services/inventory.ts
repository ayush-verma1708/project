import { Product, PaginatedResponse } from '../types';
import apiClient from '../client';

export interface InventoryUpdate {
  product: string;
  stockLevel: number;
  alertLevel: number;
}

export const inventoryService = {
  getAll: async () => {
    const { data } = await apiClient.get<PaginatedResponse<Product>>('/inventory');
    return data;
  },

  update: async (update: InventoryUpdate) => {
    const { data } = await apiClient.post('/inventory', update);
    return data;
  },
};