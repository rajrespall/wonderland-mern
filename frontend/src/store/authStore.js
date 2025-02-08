import { create } from 'zustand';
import axios from 'axios';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));

      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false 
      });

      return response.data.user;

    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Login failed',
        loading: false 
      });
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      set({ loading: true, error: null });
      
      const response = await axios.post(
        'http://localhost:5000/api/auth/register', 
        { username, email, password }, // Fix: Send data as a single object
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      
      set({ 
        user: userData,
        isAuthenticated: true,
        loading: false 
      });
      
      return userData;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Registration failed',
        loading: false 
      });
      throw error;
    }
},

  googleLogin: async (idToken) => {
    try {
      set({ loading: true, error: null });
      //send sa backend yung idToken para ma verify sa firebase if legit yung token or hindi 
      const response = await axios.post(
        'http://localhost:5000/api/auth/google-login',
        { idToken },
        { withCredentials: true }
      );
  
      // Sinave ko yung user data sa  local storage and state
      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData, isAuthenticated: true, loading: false });
  
      return userData;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Google login failed', loading: false });
      console.error('Google login failed:', error);
      throw error;
    }
  },
  

  logout: async () => {
    try {
      // Firebase signout
      await signOut(auth);
      
      // Backend logout
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });
      
      // Clear local storage
      
      localStorage.removeItem('user');
      
      // Reset store state
      set({ 
        user: null,
        isAuthenticated: false,
        error: null 
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }


}));

export default useAuthStore;