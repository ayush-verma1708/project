import { Campaign, PaginatedResponse } from '../types';
import apiClient from '../client';

export const campaignService = {
  getAll: async () => {
    const { data } = await apiClient.get<PaginatedResponse<Campaign>>('/campaigns');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Campaign>(`/campaigns/${id}`);
    return data;
  },

  create: async (campaign: Omit<Campaign, 'id'>) => {
    const { data } = await apiClient.post<Campaign>('/campaigns', campaign);
    return data;
  },

  update: async (id: string, campaign: Partial<Campaign>) => {
    const { data } = await apiClient.put<Campaign>(`/campaigns/${id}`, campaign);
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/campaigns/${id}`);
  },
   // New search method
   search: async (name: string) => {
    const { data } = await apiClient.get<Campaign>(`/campaigns/search?name=${name}`);
    return data;
  },
};