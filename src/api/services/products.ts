import { Product, PaginatedResponse } from '../types';
import apiClient from '../client';
import axios from 'axios';

interface ProductFilters {
  page?: number;
  search?: string;
  categories?: string[];
  tags?: string[];
  sort?: string;
  limit?: number; // Add this line
}



export const productService = {
 
 
  // getProductsByType: async (
  //   productType: string,
  //   filters: {
  //     page: number;
  //     search: string;
  //     categories: string[];
  //     tags: string[];
  //     sort: string;
  //     limit: number;
  //   }
  // ) => {
  //   const response = await axios.get(`/api/products/type/${productType}`, {
  //     params: {
  //       ...filters,
  //     },
  //   });
  //   return response.data;
  // },
  getProductsByType: async (
    productType: string,
    filters: {
      page: number;
      search: string;
      categories: string[];
      tags: string[];
      sort: string;
      limit: number;
    }
  ) => {
    try {
      const response = await axios.get(`http://localhost:8021/api/products/type/${productType}`, {
        params: {
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  },
  // getProductsByType: async (
  //   productType: string,
  //   filters: {
  //     page: number;
  //     search: string;
  //     categories: string[];
  //     tags: string[];
  //     sort: string;
  //     limit: number;
  //   }
  // ) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8021/api/products/type/${productType}`, {
  //       params: {
  //         ...filters,
  //       },
  //     });
  //     console.log('API Response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('API Error:', error);
  //     throw error; // Re-throw the error for React Query to handle
  //   }
  // },

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