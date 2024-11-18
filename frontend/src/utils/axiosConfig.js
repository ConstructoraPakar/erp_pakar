import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Asegúrate de que VITE_API_URL esté definida en tu archivo .env
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
