import api from "./api";

const publicRequest = async (url, options = {}) => {
  const response = await fetch(`/api${url}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }

  return response.json();
};

export const shopService = {
  getProducts: async (category = "", search = "") => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await api.get(`/products${query}`);
    return res.data;
  },

  getCart: async (sessionId) => {
    return publicRequest(`/cart?sessionId=${encodeURIComponent(sessionId)}`);
  },

  addToCart: async ({ sessionId, productId, quantity = 1 }) => {
    return publicRequest("/cart", {
      method: "POST",
      body: { sessionId, productId, quantity },
    });
  },

  updateCartQuantity: async ({ itemId, quantity }) => {
    return publicRequest(`/cart/${itemId}`, {
      method: "PATCH",
      body: { quantity },
    });
  },

  removeFromCart: async (itemId) => {
    return publicRequest(`/cart/${itemId}`, {
      method: "DELETE",
    });
  },

  clearCart: async (sessionId) => {
    return publicRequest(`/cart?sessionId=${encodeURIComponent(sessionId)}`, {
      method: "DELETE",
    });
  },

  checkout: async (sessionId) => {
    const res = await api.post("/orders", { sessionId });
    return res.data;
  },

  getOrders: async ({ status = "", search = "" } = {}) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await api.get(`/orders${query}`);
    return res.data;
  },

  getOrderStats: async () => {
    const res = await api.get("/orders/stats");
    return res.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const res = await api.patch(`/orders/${orderId}/status`, { status });
    return res.data;
  },

  deleteOrder: async (orderId) => {
    const res = await api.delete(`/orders/${orderId}`);
    return res.data;
  },

  createProduct: async (formData) => {
    const res = await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateProduct: async (productId, formData) => {
    const res = await api.put(`/products/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deleteProduct: async (productId) => {
    const res = await api.delete(`/products/${productId}`);
    return res.data;
  },

  updateStock: async (productId, quantity) => {
    const res = await api.put(`/products/${productId}/stock`, { quantity });
    return res.data;
  },
};
