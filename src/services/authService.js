import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch admin data
export const fetchAdminData = async () => {
  try {
    const response = await api.get('/admin/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin data:', error);
    throw error;
  }
};

// Function to fetch all students
export const fetchAllStudents = async () => {
  try {
    const response = await api.get('/admin/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Function to fetch fee categories
export const fetchFeeCategories = async () => {
  try {
    const response = await api.get('/admin/fees');
    return response.data;
  } catch (error) {
    console.error('Error fetching fee categories:', error);
    throw error;
  }
};

export default api;