import api from "./api";

export const blogService = {
  list: async () => {
    const res = await api.get("/blogs");
    return res.data;
  },

  create: async (payload) => {
    const res = await api.post("/blogs", payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/blogs/${id}`, payload);
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
  },
};
