import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const authService = {
  login: async (email, password) => {
    const response = await axios.post(API_URL + 'login', { email, password });
    
    if (response.data.user && response.data.user.id) {
      // Even though we don't get a token in this demo app, save user ID
      localStorage.setItem('userId', response.data.user.id);
      
      // If there is a token, set it for future requests
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
    }
    
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
  },
  
  getCurrentUser: () => {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    };
  },
  
  // Check if token is valid and user is authenticated
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false;
    }
    
    try {
      // Make a request to validate the token
      const response = await axios.get(API_URL + 'validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data.valid;
    } catch (error) {
      // If request fails, token is invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      delete axios.defaults.headers.common['Authorization'];
      return false;
    }
  }
};

export default authService;