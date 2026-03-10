import api from './api';

export const volunteerService = {
  getVolunteers: async () => {
    try {
      const response = await api.get('/volunteers');
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => [] };
    }
  },
  createVolunteer: async (data) => {
    try {
      const response = await api.post('/volunteers', data);
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  }
};
