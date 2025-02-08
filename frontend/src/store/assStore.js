// store/assStore.js
import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set, get) => ({
    userId: null,  // Store the userId
    communication: [],
    emotional: [],
    routine: [],
    sensory: [],
    others: [],
    
    setUserId: (userId) => set({ userId }),
    setCommunicationAnswers: (answers) => set({ communication: answers }),
    setEmotionalAnswers: (answers) => set({ emotional: answers }),
    setRoutineAnswers: (answers) => set({ routine: answers }),
    setSensoryAnswers: (answers) => set({ sensory: answers }),
    setOthersAnswers: (answers) => set({ others: answers }),

    submitAssessment: async () => {
        const { userId, communication, emotional, routine, sensory, social, others } = get();
    
        if (!userId) {
            console.error("User ID is missing, cannot submit assessment");
            return;
        }
    
        try {
            console.log("Submitting data:", { userId, communication, emotional, routine, sensory, social, others });
    
            const response = await axios.post('/api/submit', {
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
