import { create } from "zustand";
import axios from "axios";

const usePredictiveStore = create((set) => ({
    logicalAbilityScore: 0,
    predictedScore: 0,
    growthPercentage: 0,
    trend: "neutral",

    fetchLogicalAbilityScore: async () => {
        try {
            console.log("Fetching Logical Ability Score...");

            const response = await axios.get("http://localhost:5000/api/predictive/logical-ability", {
                withCredentials: true
            });

            console.log("✅ API Response:", response.data);

            if (response.data) {
                set({
                    logicalAbilityScore: response.data.logicalAbilityScore,
                    predictedScore: response.data.predictedScore,
                    growthPercentage: response.data.growthPercentage,
                    trend: response.data.trend
                });
            } else {
                console.error("❌ Invalid response structure:", response.data);
            }
        } catch (error) {
            console.error("❌ Error fetching logical ability score:", error);
            set({ logicalAbilityScore: 0, predictedScore: 0, growthPercentage: 0, trend: "neutral" });
        }
    }
}));

export default usePredictiveStore;
