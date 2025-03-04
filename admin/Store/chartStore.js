import { create } from "zustand";
import axios from "axios";

const useChartStore = create((set) => ({
    usersPerMonth: [],
    gamesPlayed: [],
    gameAnalytics: [],

    fetchUsersPerMonth: async () => {
        try {
            console.log("🔄 Fetching Users Per Month...");
            
            const response = await axios.get("http://localhost:5000/api/admin/users-per-month", {
                withCredentials: true, // Important for CORS
            });

            console.log("📊 API Response:", response.data);

            set({ usersPerMonth: response.data });
        } catch (error) {
            console.error("❌ Error fetching users per month:", error.response ? error.response.data : error);
        }
    },

    fetchGamesPlayed: async () => {
        try {
            console.log("🔄 Fetching Games Played...");
            const response = await axios.get("http://localhost:5000/api/admin/games-played", { withCredentials: true });
            console.log("🎮 Games Played Data:", response.data);
            set({ gamesPlayed: response.data });
        } catch (error) {
            console.error("❌ Error fetching games played:", error.response?.data || error);
        }
    },

    fetchGameAnalytics: async () => {
        try {
            console.log("🔄 Fetching Game Analytics...");
            const response = await axios.get("http://localhost:5000/api/admin/game-analytics", { withCredentials: true });
            console.log("📊 Game Analytics Data:", response.data);
            set({ gameAnalytics: response.data });
        } catch (error) {
            console.error("❌ Error fetching game analytics:", error.response?.data || error);
        }
    }

}));

export default useChartStore;
