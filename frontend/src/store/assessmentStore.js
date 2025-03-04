import { create } from 'zustand';
import axios from 'axios';

const useAssessmentStore = create((set, get) => ({
    // Assessment state
    userId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null,
    communication: [],
    emotional: [],
    routine: [],
    sensory: [],
    social: [],
    others: [],
    
    // Resources state
    userAssessment: null,
    loading: false,
    error: null,
    showComm: false,
    showSocial: false,
    showSensory: false,
    showEmotional: false,
    showRoutine: false,

    // Assessment actions
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
            const response = await axios.post('http://localhost:5000/api/assessment/submit', {
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
                const user = JSON.parse(localStorage.getItem('user'));
                user.hasCompletedAssessment = true;
                localStorage.setItem('user', JSON.stringify(user));
                
                return response.data;
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error('Error submitting assessment:', error);
            set({ error: error.response?.data?.message || "Error submitting assessment" });
        }
    },

    // Resources actions
    fetchUserAssessment: async (userId) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`http://localhost:5000/api/assessment/${userId}`);
            const userAssessment = response.data;

            set({
                userAssessment,
                // Compare with default "no issues" values (all 4s which represent ISAA score of 1)
                showComm: JSON.stringify(userAssessment.communication) !== JSON.stringify([4, 4, 4, 4]),
                showSocial: JSON.stringify(userAssessment.social) !== JSON.stringify([4, 4, 4, 4]),
                showSensory: JSON.stringify(userAssessment.sensory) !== JSON.stringify([4, 4, 4]),
                showEmotional: JSON.stringify(userAssessment.emotional) !== JSON.stringify([4, 4, 4]),
                showRoutine: JSON.stringify(userAssessment.routine) !== JSON.stringify([4, 4, 4]),
                loading: false
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching assessment", loading: false });
        }
    },

    startReassessment: () => {
        // Clear local storage of previous answers
        for (let i = 0; i < 4; i++) {
            localStorage.removeItem(`Communication_${i}_answer`);
            localStorage.removeItem(`Emotional_${i}_answer`);
            localStorage.removeItem(`Routine_${i}_answer`);
            localStorage.removeItem(`Sensory_${i}_answer`);
            localStorage.removeItem(`Social_${i}_answer`);
        }
        localStorage.removeItem("Others_answers");
        
        // Reset assessment state
        set({
            communication: [],
            emotional: [],
            routine: [],
            sensory: [],
            social: [],
            others: []
        });
        
        return true;
    },
    
    fetchAssessmentHistory: async (userId) => {
        set({ loading: true, error: null });
        
        try {
            const response = await axios.get(`http://localhost:5000/api/assessment/${userId}/history`);
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching assessment history", loading: false });
            return null;
        } finally {
            set({ loading: false });
        }
    },
    
    fetchSpecificAssessment: async (userId, version) => {
        set({ loading: true, error: null });
        
        try {
            const response = await axios.get(`http://localhost:5000/api/assessment/${userId}?version=${version}`);
            const userAssessment = response.data;
            
            set({
                userAssessment,
                showComm: JSON.stringify(userAssessment.communication) !== JSON.stringify([4, 4, 4, 4]),
                showSocial: JSON.stringify(userAssessment.social) !== JSON.stringify([4, 4, 4, 4]),
                showSensory: JSON.stringify(userAssessment.sensory) !== JSON.stringify([4, 4, 4]),
                showEmotional: JSON.stringify(userAssessment.emotional) !== JSON.stringify([4, 4, 4]),
                showRoutine: JSON.stringify(userAssessment.routine) !== JSON.stringify([4, 4, 4]),
                loading: false
            });
            
            return userAssessment;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error fetching assessment", loading: false });
            return null;
        }
    }
}));

export default useAssessmentStore;