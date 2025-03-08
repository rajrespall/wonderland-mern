import { create } from "zustand";
import axios from "axios";

const useAdminStore = create((set) => ({
  admin: null,
  isAuthenticated: false,

  
  checkAuth: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin-auth/check-auth", {
        withCredentials: true, // ✅ Send cookies with the request
      });

      set({ admin: response.data.admin, isAuthenticated: true });
    } catch (error) {
      set({ admin: null, isAuthenticated: false });
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin-auth/login",
        { username, password },
        { withCredentials: true } 
      );

      set({ admin: response.data.admin, isAuthenticated: true });
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message || error.message);
    }
  },

  logout: async () => {
    try {
      await axios.post("http://localhost:5000/api/admin-auth/logout", {}, { withCredentials: true });
      set({ admin: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout Failed:", error.response?.data?.message || error.message);
    }
  },
}));

export default useAdminStore;
