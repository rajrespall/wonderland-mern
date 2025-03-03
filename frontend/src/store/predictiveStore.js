import { create } from "zustand";
import axios from "axios";

const usePredictiveStore = create((set) => ({
    logicalAbilityScore: 0,
    predictedScore: 0,
    growthPercentage: 0,
    trend: "neutral",

    motorSkillsScore: 0,
    motorTrend: "neutral",

    fetchLogicalAbilityScore: async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/predictive/logical-ability", {
                withCredentials: true
            });

            if (response.data) {
                set({
                    logicalAbilityScore: response.data.logicalAbilityScore,
                    predictedScore: response.data.predictedScore,
                    growthPercentage: response.data.growthPercentage,
                    trend: response.data.trend
                });
            }
        } catch (error) {
            set({ logicalAbilityScore: 0, predictedScore: 0, growthPercentage: 0, trend: "neutral" });
        }
    },

    fetchMotorSkillsScore: async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/predictive/motor-skills", {
                withCredentials: true
            });
    
            if (response.data) {
                set({
                    motorSkillsScore: response.data.motorSkillsScore,
                    motorTrend: response.data.trend,  // Ensure trend is properly set
                    avgScore: response.data.trend.avgScore,  // Ensure avgScore is properly set
                });
            }
        } catch (error) {
            set({ motorSkillsScore: 0, motorTrend: { trend: "neutral", avgScore: 0 } });
        }
    }
    
    
    
}));

export default usePredictiveStore;

