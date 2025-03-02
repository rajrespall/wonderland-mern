import { create } from "zustand";
import axios from "axios";

const usePredictiveStore = create((set) => ({
    logicalAbilityScore: 0,
    predictedScore: 0,

    fetchLogicalAbilityScore: async () => {
        try {
            console.log("Fetching Logical Ability Score...");

            const response = await axios.get("http://localhost:5000/api/predictive/logical-ability", {
                withCredentials: true
            });

            console.log("API Response:", response.data);

            if (response.data && typeof response.data.logicalAbilityScore !== "undefined") {
                set({ 
                    logicalAbilityScore: response.data.logicalAbilityScore,
                    predictedScore: response.data.predictedScore
                });
                console.log("Updated Zustand State:", response.data.logicalAbilityScore, response.data.predictedScore);
            } else {
                console.error("Invalid response structure:", response.data);
            }
        } catch (error) {
            console.error("Error fetching logical ability score:", error);
            set({ logicalAbilityScore: 0, predictedScore: 0 });
        }
    }
}));

export default usePredictiveStore;
