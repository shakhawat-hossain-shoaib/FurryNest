import api from './api';

export const donationService = {
  getDonations: async () => {
    try {
      const response = await api.get('/donations');
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false };
    }
  },
  createDonation: async (data) => {
    try {
      const response = await api.post('/donations', data);
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  }
};
