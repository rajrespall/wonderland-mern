import { create } from 'zustand';
import axios from 'axios';
const useInfoStore = create((set) => ({
  generalInfo: null,
  loading: false,
  error: null,

  createGeneralInfo: async (childData) => {
    try {
      set({ loading: true, error: null });
      
      const response = await axios.post(
        'http://localhost:5000/api/general-info',
        childData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      set({
        generalInfo: response.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to create general info',
        loading: false,
      });
      throw error;
    }
  },

  getGeneralInfo: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/general-info',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        generalInfo: response.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to fetch general info',
        loading: false,
      });
      throw error;
    }
  },

  updateGeneralInfo: async (updates) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/general-info',
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({
        generalInfo: response.data,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to update general info',
        loading: false,
      });
      throw error;
    }
  },

  
  
}));
export default useInfoStore;