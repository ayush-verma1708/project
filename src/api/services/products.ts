import { Product, PaginatedResponse } from '../types';
import apiClient from '../client';

export const productService = {
  // Get all products with optional filters
  // getAll: async (filters?: {
  //   page?: number;
  //   search?: string;
  //   categories?: string[];
  //   tags?: string[];
  //   sort?: string;
  //   limit?: number;
  // }) => {
  //   try {
  //     const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', {
  //       params: {
  //         page: filters?.page || 1,
  //         search: filters?.search || '',
  //         categories: filters?.categories?.join(','),
  //         tags: filters?.tags?.join(','),
  //         sort: filters?.sort || 'Newest',
  //         limit: filters?.limit || 12
  //       }
  //     });
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     throw new Error("Failed to fetch products");
  //   }
  // },
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
          categories: filters?.categories?.length ? filters.categories.join(',') : undefined,
          tags: filters?.tags?.length ? filters.tags.join(',') : undefined,
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

getByName: async (name: string): Promise<Product> => {
  try {
    const { data } = await apiClient.get<Product>(`/products/search`, { // ✅ Correct endpoint
      params: { search: name }, // ✅ Correct parameter
    });
    return data; // ✅ Expecting a single product
  } catch (error) {
    console.error(`Error fetching product with name "${name}":`, error);
    throw new Error('Failed to fetch product');
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
  }
};


// import { Product, PaginatedResponse } from '../types';
// import apiClient from '../client';

// export const productService = {
//   getAll: async () => {
//     try {
//       const { data } = await apiClient.get<PaginatedResponse<Product>>('/products');
//       return data;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       throw new Error("Failed to fetch products");
//     }
//   },

//   getById: async (id: string) => {
//     const { data } = await apiClient.get<Product>(`/products/${id}`);
//     return data;
//   },

//   create: async (product: Omit<Product, 'id' | 'createdAt'>) => {
//     const { data } = await apiClient.post<Product>('/products', product);
//     return data;
//   },

//   update: async (id: string, product: Partial<Product>) => {
//     const { data } = await apiClient.put<Product>(`/products/${id}`, product);
//     return data;
//   },

//   delete: async (id: string) => {
//     await apiClient.delete(`/products/${id}`);
//   },
// };