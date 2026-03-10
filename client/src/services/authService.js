import api from './api';

export const authService = {
  verify: async (token) => {
    // using fetch-like response format wrapper for backwards compatibility
    try {
      const response = await api.get('/users/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  },
  verifyAdmin: async (token) => {
    try {
      const response = await api.get('/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  },
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  },
  adminLogin: async (credentials) => {
    try {
      const response = await api.post('/admin/login', credentials);
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  }
};
