import { create } from 'zustand';
import axios from 'axios';

const useProfileStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,
  
  // Fetch user profile
  getProfile: async () => {
    try {
      set({ loading: true, error: null });
      
      const response = await axios.get(
        'http://localhost:5000/api/profile',
        { withCredentials: true }
      );
      
      set({
        profile: response.data,
        loading: false
      });
      
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch profile',
        loading: false
      });
      throw error;
    }
  },
  
  // Update or create profile
  updateProfile: async (profileData, profilePicture = null) => {
    try {
      set({ loading: true, error: null });
      
      // Create form data if there's a profile picture
      let data;
      let config = { withCredentials: true };
      
      if (profilePicture) {
        data = new FormData();
        // Add all profile fields to FormData
        Object.keys(profileData).forEach(key => {
          data.append(key, profileData[key]);
        });
        data.append('profilePicture', profilePicture);
        
        config.headers = { 'Content-Type': 'multipart/form-data' };
      } else {
        data = profileData;
        config.headers = { 'Content-Type': 'application/json' };
      }
      
      const response = await axios.post(
        'http://localhost:5000/api/profile',
        data,
        config
      );
      
      set({
        profile: response.data.profile,
        loading: false
      });
      
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update profile',
        loading: false
      });
      throw error;
    }
  },
  
  // Reset profile store (e.g., when logging out)
  resetProfile: () => {
    set({
      profile: null,
      loading: false,
      error: null
    });
  }
}));

export default useProfileStore;