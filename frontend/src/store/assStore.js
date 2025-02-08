import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set, get) => ({
    userId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null,
    communication: [],
    emotional: [],
    routine: [],
    sensory: [],
    social: [],
    others: [],

    setUserId: (userId) => {
        localStorage.setItem("user", JSON.stringify({ id: userId }));
        set({ userId });
    },

    setCommunicationAnswers: (answers) => set({ communication: answers }),
    setEmotionalAnswers: (answers) => set({ emotional: answers }),
    setRoutineAnswers: (answers) => set({ routine: answers }),
    setSensoryAnswers: (answers) => set({ sensory: answers }),
    setSocialAnswers: (answers) => set({ social: answers }),
    setOthersAnswers: (answers) => set({ others: answers }),

    submitAssessment: async () => {
        const { userId, communication, emotional, routine, sensory, social, others } = get();

        if (!userId) {
            console.error("User ID is missing, cannot submit assessment");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/assessment/submit', {  // <-- FIXED URL
                userId,
                communication,
                emotional,
                routine,
                sensory,
                social,
                others
            }, { withCredentials: true });

            if (response.status === 201) {
                console.log('Assessment saved successfully:', response.data);
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error('Error submitting assessment:', error);
        }
    }
}));

export default useStore;
