import apiClient from '../client';

export interface ReportData {
  type: string;
  data: any;
}

export const reportService = {
  getAll: async () => {
    const { data } = await apiClient.get('/reports');
    return data;
  },

  getByType: async (type: string) => {
    const { data } = await apiClient.get(`/reports/type/${type}`);
    return data;
  },

  create: async (report: ReportData) => {
    const { data } = await apiClient.post('/reports', report);
    return data;
  },
};