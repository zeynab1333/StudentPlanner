import axios from 'axios';

// Create an axios instance with a hardcoded base URL
// Change this URL for production deployment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // You can add headers or interceptors here if needed
});

export default api;

// Usage example in a component:
// import api from '../services/api';
// api.post('/auth/register', data)
