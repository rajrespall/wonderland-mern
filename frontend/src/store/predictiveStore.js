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
},

fetchSocialCommunicationScore: async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/predictive/social-communication", {
            withCredentials: true
        });

        console.log("📊 Fetching Social Communication Data:", response.data); // Debugging

        if (response.data) {
            set({
                socialCommunicationScore: response.data.socialCommunicationScore,
                socialTrend: response.data.trend // Ensure this is correctly set
            });
        }
    } catch (error) {
        console.error("❌ Error fetching social communication data:", error);
        set({ socialCommunicationScore: 0, socialTrend: "neutral" });
    }
},

fetchCreativityScore: async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/predictive/creativity-score", {
            withCredentials: true
        });

        console.log("📊 Fetching Creativity Data:", response.data); // Debugging log

        if (response.data) {
            set({
                creativityScore: response.data.creativityScore,
                creativityTrend: response.data.trend
            });
        }
    } catch (error) {
        console.error("❌ Error fetching creativity score:", error);
        set({ creativityScore: 0, creativityTrend: { trend: "neutral", avgGap: 0 } });
    }
}



    
    
}));

export default usePredictiveStore;

