import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url ?? '';
    const isLoginRequest = requestUrl.endsWith('/auth/login');

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('accessToken');
      window.dispatchEvent(new Event('auth:logout'));
    }

    return Promise.reject(error);
  },
);
