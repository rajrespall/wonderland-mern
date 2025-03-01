import { create } from "zustand";
import axios from "axios";

const usePredictiveStore = create((set) => ({
    logicalAbilityScore: 0,
    
    fetchLogicalAbilityScore: async () => {
        try {
            const response = await axios.get("/api/predictive/logical-ability", {
                withCredentials: true
            });
            
            // Update Zustand state properly using functional update
            set((state) => ({ logicalAbilityScore: response.data.logicalAbilityScore }));
        } catch (error) {
            console.error("Error fetching logical ability score:", error);
            
            // Reset logicalAbilityScore to 0 if request fails
            set({ logicalAbilityScore: 0 });
        }
    }
}));

export default usePredictiveStore;
