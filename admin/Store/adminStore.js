import { create } from "zustand";

const useAdminStore = create((set) => ({
  admin: null,
  token: null,
  isAuthenticated: false,

  login: async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("adminToken", data.token);
      set({ admin: data.admin, token: data.token, isAuthenticated: true });
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    set({ admin: null, token: null, isAuthenticated: false });
  },
}));

export default useAdminStore;
