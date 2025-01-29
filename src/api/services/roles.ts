import { Role } from '../types';
import apiClient from '../client';

export const roleService = {
  getAll: async () => {
    const { data } = await apiClient.get<Role[]>('/roles');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Role>(`/roles/${id}`);
    return data;
  },

  create: async (role: Omit<Role, 'id'>) => {
    const { data } = await apiClient.post<Role>('/roles', role);
    return data;
  },

  update: async (id: string, role: Partial<Role>) => {
    const { data } = await apiClient.put<Role>(`/roles/${id}`, role);
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/roles/${id}`);
  },
};