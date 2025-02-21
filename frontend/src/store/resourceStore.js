import { create } from 'zustand';
import axios from 'axios';

const useResourceStore = create((set) => ({
    resources: [],
    loading: false,
    error: null,

    fetchResources: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('http://localhost:5000/api/resources');
            set({ resources: response.data, loading: false });
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Error fetching resources", 
                loading: false 
            });
        }
    },

    getResourcesByType: (type) => {
        const { resources } = useResourceStore.getState();
        return resources.filter(resource => resource.resourceType === type);
    }
}));

export default useResourceStore;