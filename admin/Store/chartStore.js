import { create } from "zustand";
import axios from "axios";

const useChartStore = create((set) => ({
    usersPerMonth: [],
    gamesPlayed: [],
    gamesPlayedByDifficulty: [], // Add state for difficulty-based data
    gameAnalytics: [],
    reviewsPerMonth: [], // ✅ New State for Reviews


    fetchUsersPerMonth: async () => {
        try {
            console.log("🔄 Fetching Users Per Month...");
            const response = await axios.get("http://localhost:5000/api/admin/users-per-month", { withCredentials: true });
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

    fetchGamesPlayedByDifficulty: async () => {
        try {
            console.log("🔄 Fetching Games Played by Difficulty...");
            const response = await axios.get("http://localhost:5000/api/admin/games-played-by-difficulty", { withCredentials: true });
            console.log("📊 Games Played by Difficulty Data:", response.data);
            set({ gamesPlayedByDifficulty: response.data });
        } catch (error) {
            console.error("❌ Error fetching games played by difficulty:", error.response?.data || error);
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
    },

    fetchReviewsPerMonth: async () => {
        try {
            console.log("🔄 Fetching Reviews Per Month...");
            const response = await axios.get("http://localhost:5000/api/admin/reviews-per-month", { withCredentials: true });
            console.log("⭐ Reviews Per Month Data:", response.data);
            set({ reviewsPerMonth: response.data });
        } catch (error) {
            console.error("❌ Error fetching reviews per month:", error.response?.data || error);
        }
    },

    

}));

export default useChartStore;
