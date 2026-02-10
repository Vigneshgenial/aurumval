import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getGoldRates() {
  const { data } = await apiClient.get('/api/gold-rates');
  return data;
}

export async function uploadGoldImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
