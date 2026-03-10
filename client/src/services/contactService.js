import api from './api';

export const contactService = {
  createContact: async (data) => {
    try {
      const response = await api.post('/contact', data);
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  },

  getContacts: async () => {
    const res = await api.get('/contacts');
    return res.data;
  },

  updateContactStatus: async (contactId, status) => {
    const res = await api.patch(`/contacts/${contactId}/status`, { status });
    return res.data;
  },

  deleteContact: async (contactId) => {
    const res = await api.delete(`/contacts/${contactId}`);
    return res.data;
  }
};
