import api from "./api";

export const successStoryService = {
  list: async () => {
    const res = await api.get("/success-stories");
    return res.data;
  },

  create: async (payload) => {
    const res = await api.post("/success-stories", payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/success-stories/${id}`, payload);
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/success-stories/${id}`);
    return res.data;
  },
};
