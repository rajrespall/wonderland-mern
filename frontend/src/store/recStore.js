import { create } from 'zustand';
import axios from 'axios';

const useRecStore = create((set) => ({
    userAssessment: null,
    loading: false,
    error: null,

    fetchUserAssessment: async (userId) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`http://localhost:5000/api/recors/assessment/${userId}`);
            set({ userAssessment: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching assessment", loading: false });
        }
    }
}));

export default useRecStore;
