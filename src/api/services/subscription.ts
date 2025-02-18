import {  SubscriptionResponse } from '../types';
import apiClient from '../client';

export const subscriptionService = {
  // Subscribe a user
  subscribe: async (email: string): Promise<SubscriptionResponse> => {
    const { data } = await apiClient.post<SubscriptionResponse>('/subscription/subscribe', {
      email,
    });
    return data;
  },


  // Update subscription status if the email exists but is not subscribed
  updateSubscription: async (email: string): Promise<SubscriptionResponse> => {
    const { data } = await apiClient.post<SubscriptionResponse>('/subscription/update-subscription', {
      email,
    });
    return data;
  },

  // Toggle subscription status (enable/disable)
  toggleSubscription: async (email: string, subscribe: boolean): Promise<SubscriptionResponse> => {
    const { data } = await apiClient.post<SubscriptionResponse>('/subscription/toggle-subscription', {
      email,
      subscribe,
    });
    return data;
  },
};
