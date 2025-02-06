import { ProductType } from '../types';
import apiClient from '../client';

export const productTypeService = {
  getAll: async () => {
    const { data } = await apiClient.get<ProductType[]>('/productType');
    return data;
  },

};
