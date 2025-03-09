import { create } from "zustand";
import axios from "axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const useAdminStore = create((set) => ({
  admin: null,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin-auth/check-auth", {
        withCredentials: true, // ✅ This ensures cookies are sent
      });

      if (response.data.admin && response.data.admin.role === "admin") {
        set({ admin: response.data.admin, isAuthenticated: true });
      } else {
        throw new Error("Unauthorized access");
      }
    } catch (error) {
      console.error("Auth Check Failed:", error.message);
      set({ admin: null, isAuthenticated: false });
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin-auth/login",
        { username, password },
        { withCredentials: true } // ✅ Ensures cookies are stored
      );

      if (response.data.message === "Login successful") {
        set({ admin: response.data.admin, isAuthenticated: true });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message || error.message);
      set({ admin: null, isAuthenticated: false });
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
