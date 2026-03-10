import api from './api';
import axios from 'axios';

const toQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : '';
};

export const petService = {
  getPets: async (type, status) => {
    const response = await api.get(`/pets${toQueryString({ type, status })}`);
    return response.data;
  },
  getAllPets: async () => {
    const response = await api.get('/pets/manage?status=all');
    return response.data;
  },
  getPetById: async (id) => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  },
  getPetCount: async () => {
    const response = await api.get('/pets/count');
    return { ok: true, json: async () => response.data };
  },
  addPet: async (formData) => {
    const token = localStorage.getItem('token');
    return axios.post('/api/pets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
  },
  updatePet: async (id, formData) => {
    const token = localStorage.getItem('token');
    return axios.put(`/api/pets/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
  },
  deletePet: async (id) => {
    try {
      const response = await api.delete(`/pets/${id}`);
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Error' } };
    }
  },
  updatePetStatus: async (id, status) => {
    try {
      const response = await api.patch(`/pets/${id}/status`, { status });
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Error' } };
    }
  },
  requestPet: async (formData) => {
    try {
      const response = await axios.post('/api/pets/request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => error.response?.data || { message: 'Network error' } };
    }
  },
  getPendingPets: async () => {
    try {
      const response = await api.get('/pets/pending');
      return { ok: true, json: async () => response.data };
    } catch (error) {
      return { ok: false, json: async () => [] };
    }
  },
  approvePet: async (id) => {
    return petService.updatePetStatus(id, 'approved');
  },
  rejectPet: async (id) => {
    return petService.updatePetStatus(id, 'rejected');
  }
};
