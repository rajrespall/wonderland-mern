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
        { username, email, password }, 
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
      const response = await axios.post(
        'http://localhost:5000/api/auth/google-login',
        { idToken },
        { withCredentials: true }
      );
  
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
      await signOut(auth);

      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });
      
      localStorage.removeItem('user');
      
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