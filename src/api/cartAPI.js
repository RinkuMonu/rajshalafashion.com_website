

import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;


const API = axios.create({
  baseURL: `${baseUrl}/cart`,
});

// ✅ Add interceptor to attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 👈 get from token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addToCartAPI = (product) => API.post("/add", product);
export const getCartAPI = () => API.get("/");
export const updateCartItemAPI = (payload) => API.post("/update", payload);
export const removeCartItemAPI = (payload) => API.post("/remove", payload);
export const checkoutAPI = () => API.post("/checkout");
