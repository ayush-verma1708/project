import { Settings } from '../types';
import apiClient from '../client';

export const settingsService = {
  get: async () => {
    const { data } = await apiClient.get<Settings>('/settings');
    return data;
  },

  update: async (settings: Partial<Settings>) => {
    const { data } = await apiClient.put<Settings>('/settings', settings);
    return data;
  },
};