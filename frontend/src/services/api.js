import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCategories = () => api.get('/categories');
export const getMenuItems = (params) => api.get('/menu', { params });
export const getMenuItem = (id) => api.get(`/menu/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOffers = () => api.get('/offers');
export const getGallery = (category) => api.get('/gallery', { params: { category } });
export const getRestaurantSettings = () => api.get('/restaurant');

export const adminLogin = (credentials) => api.post('/auth/login', credentials);
export const createMenuItem = (item) => api.post('/menu', item);
export const updateMenuItem = (id, item) => api.put(`/menu/${id}`, item);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);
export const getAdminOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });
export const updateSetting = (key, value) => api.put(`/restaurant?key=${key}`, { value });

export default api;
