import { create } from 'zustand';
import axios from 'axios';

const useRecStore = create((set) => ({
    userAssessment: null,
    loading: false,
    error: null,
    showComm: false,
    showSocial: false,
    showSensory: false,
    showEmotional: false,
    showRoutine: false,

    fetchUserAssessment: async (userId) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`http://localhost:5000/api/recors/assessment/${userId}`);
            const userAssessment = response.data;

            // Set the user assessment and calculate visibility for each category
            set({
                userAssessment,
                showComm: JSON.stringify(userAssessment.communication) !== JSON.stringify([4, 1, 1, 1]),
                showSocial: JSON.stringify(userAssessment.social) !== JSON.stringify([4, 4, 1, 1]),
                showSensory: JSON.stringify(userAssessment.sensory) !== JSON.stringify([1, 1, 1]),
                showEmotional: JSON.stringify(userAssessment.emotional) !== JSON.stringify([1, 1, 1]),
                showRoutine: JSON.stringify(userAssessment.routine) !== JSON.stringify([1, 1, 1]),
                loading: false
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching assessment", loading: false });
        }
    }
}));

export default useRecStore;
