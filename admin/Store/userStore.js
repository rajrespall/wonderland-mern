import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
    users: [],
    loading: false,
    error: null,

    // Fetch users
    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            set({ users: response.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch users", loading: false });
        }
    },

    // Toggle user status (Enable/Disable)
    toggleUserStatus: async (userId) => {
        set({ loading: true });
        try {
            await axios.put(`http://localhost:5000/api/users/toggle-status/${userId}`);
            await useUserStore.getState().fetchUsers(); // Refresh user list after update
        } catch (error) {
            set({ error: "Failed to update user status", loading: false });
        }
    },

    updateUserStatus: async (userId, currentStatus) => {
        set({ loading: true });
        let newStatus = "";

        switch (currentStatus) {
            case "enabled":
                newStatus = "disabled";
                break;
            case "disabled":
                newStatus = "enabled";
                break;
            case "inactive":
                newStatus = "enabled";
                break;
            default:
                newStatus = currentStatus;
        }

        try {
            await axios.put(`http://localhost:5000/api/users/update-status/${userId}`, { status: newStatus });
            await useUserStore.getState().fetchUsers(); // Refresh user list after update
        } catch (error) {
            set({ error: "Failed to update user status", loading: false });
        }
    }
}));

export default useUserStore;
