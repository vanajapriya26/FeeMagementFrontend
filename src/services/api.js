import axios from 'axios';

// Update the API base URL
const API_BASE_URL = 'http://localhost:5000';

// Admin Login API Call
export const loginAdmin = async (name, password, adminCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, { name, password, adminCode });
    // Store the token in localStorage for future authenticated requests
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', 'admin');
    }
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
};

// Student Login API Call
export const loginStudent = async (studentID, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/students/login`, { studentID, password });
    // Store the token in localStorage for future authenticated requests
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', 'student');
      localStorage.setItem('student', JSON.stringify(response.data.student));
    }
    return response.data;
  } catch (error) {
    console.error('Student login error:', error);
    throw error;
  }
};

// Admin Registration API Call
export const registerAdmin = async (name, email, password, confirmPassword, adminCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/register`, { 
      name, 
      email, 
      password, 
      confirmPassword,
      adminCode
    });
    return response.data;
  } catch (error) {
    console.error('Admin registration error:', error);
    throw error;
  }
};

// Fee Category
export const addFeeCategory = async (category, amount) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_BASE_URL}/admin/addfees`, 
      { category, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('API Error:', error);

    // Check if the error response contains data
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: 'An unexpected error occurred. Please try again later.' };
    }
  }
};

// Add Notification API Call
export const addNotification = async (title, message, Type, Priority) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_BASE_URL}/admin/addnotification`, 
      { title, message, Type, Priority },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding notification:', error);
    
    // Check if the error response contains data
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: 'An unexpected error occurred. Please try again later.' };
    }
  }
};
const API_URL = 'http://localhost:5000/students/fees';

export const fetchFees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching fees:', error);
    throw error;
  }
};