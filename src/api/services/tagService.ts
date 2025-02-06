import { Tag } from '../types';
import apiClient from '../client';

export const tagService = {
  getAll: async () => {
    const { data } = await apiClient.get<Tag[]>('/tag');
    return data;
  },

};
