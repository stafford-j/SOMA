// Basic authentication service

const authService = {
  // Mock user data for development
  user: {
    id: 'aldr-12345-67890',
    name: 'Aldr User',
    email: 'aldruser@example.com',
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    return localStorage.getItem('userId') !== null;
  },
  
  // Login user
  login: (credentials) => {
    // In a real application, this would make an API call
    return new Promise((resolve) => {
      // Mock successful login
      localStorage.setItem('userId', 'aldr-12345-67890');
      setTimeout(() => {
        resolve({ success: true, user: authService.user });
      }, 500);
    });
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('userId');
    return Promise.resolve({ success: true });
  },
  
  // Get current user info
  getCurrentUser: () => {
    if (!authService.isAuthenticated()) {
      return null;
    }
    return authService.user;
  }
};

export default authService;