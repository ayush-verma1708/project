import { Product, PaginatedResponse } from '../types';
import apiClient from '../client';

export const productService = {
  // Get all products with optional filters
  getAll: async (filters?: {
    page?: number;
    search?: string;
    categories?: string[];
    tags?: string[];
    sort?: string;
    limit?: number;
  }) => {
    try {
      const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', {
        params: {
          page: filters?.page || 1,
          search: filters?.search || '',
          categories: filters?.categories?.join(','),
          tags: filters?.tags?.join(','),
          sort: filters?.sort || 'Newest',
          limit: filters?.limit || 12
        }
      });
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  // Get products by type with filters
  getProductsByType: async (productType: string, filters?: {
    page?: number;
    search?: string;
    categories?: string[];
    tags?: string[];
    sort?: string;
    limit?: number;
  }) => {
    try {
      const { data } = await apiClient.get<PaginatedResponse<Product>>(`/products/type/${productType}`, {
        params: {
          page: filters?.page || 1,
          search: filters?.search || '',
          categories: filters?.categories?.join(','),
          tags: filters?.tags?.join(','),
          sort: filters?.sort || 'Newest',
          limit: filters?.limit || 12
        }
      });
      return data;
    } catch (error) {
      console.error("Error fetching products by type:", error);
      throw new Error("Failed to fetch products by type");
    }
  },

  // Get a product by ID
  getById: async (id: string) => {
    try {
      const { data } = await apiClient.get<Product>(`/products/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error("Failed to fetch product by ID");
    }
  },

  // Get product by name
  getByName: async (name: string): Promise<Product> => {
    try {
      const { data } = await apiClient.get<Product>(`/products/search`, {
        params: { search: name },
      });
      return data;
    } catch (error) {
      console.error(`Error fetching product with name "${name}":`, error);
      throw new Error('Failed to fetch product');
    }
  },

  // Create a new product
  create: async (product: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const { data } = await apiClient.post<Product>('/products', product);
      return data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  },

  // Update a product by ID
  update: async (id: string, product: Partial<Product>) => {
    try {
      const { data } = await apiClient.put<Product>(`/products/${id}`, product);
      return data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  },

  // Delete a product by ID
  delete: async (id: string) => {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  },

  // Search products
  search: async (
    query: string, 
    page = 1, 
    limit = 10,
    options?: RequestInit
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const { data } = await apiClient.get('/products/search/full', {
        params: { query, page, limit },
        ...options
      });
      return data;
    } catch (error) {
      console.error(`Search error for "${query}":`, error);
      throw new Error('Failed to search products');
    }
  },

  // Autocomplete suggestions
  autocomplete: async (
    query: string,
    options?: RequestInit
  ): Promise<Product[]> => {
    try {
      const { data } = await apiClient.get('/products/search/autocomplete', {
        params: { query },
        ...options
      });
      return data || [];
    } catch (error) {
      console.error(`Autocomplete error for "${query}":`, error);
      throw error;
    }
  },

  // Get new arrivals
  getNewArrivals: async () => {
    try {
      const { data } = await apiClient.get<Product[]>('/products/new-arrivals');
      return {
        products: data,
        total: data.length,
        totalPages: 1,
        currentPage: 1
      };
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      throw new Error("Failed to fetch new arrivals");
    }
  },

  // Get trending products
  getTrendingProducts: async () => {
    try {
      const { data } = await apiClient.get<Product[]>('/products/trending');
      return {
        products: data,
        total: data.length,
        totalPages: 1,
        currentPage: 1
      };
    } catch (error) {
      console.error("Error fetching trending products:", error);
      throw new Error("Failed to fetch trending products");
    }
  }
};