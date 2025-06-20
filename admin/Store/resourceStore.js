import { create } from "zustand";
import axios from "axios";

const useAdminResourceStore = create((set, get) => ({
  resources: [],
  loading: false,
  error: null,
  totalResources: 0,

  // Fetch all resources
  fetchResources: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:5000/api/resources", {
        withCredentials: true,
      });
      set({ 
        resources: response.data, 
        totalResources: response.data.length,
        loading: false 
      });
    } catch (error) {
      console.error("Error fetching resources:", error);
      set({
        error: error.response?.data?.error || "Failed to fetch resources",
        loading: false,
      });
    }
  },

  // Create a new resource
  createResource: async (resourceData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/resources",
        resourceData,
        { withCredentials: true }
      );
      
      set((state) => ({
        resources: [...state.resources, response.data],
        totalResources: state.totalResources + 1,
        loading: false,
      }));
      
      return { success: true, resource: response.data };
    } catch (error) {
      console.error("Error creating resource:", error);
      const errorMessage = error.response?.data?.error || "Failed to create resource";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Get resource by ID
  getResourceById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:5000/api/resources/${id}`, {
        withCredentials: true,
      });
      set({ loading: false });
      return { success: true, resource: response.data };
    } catch (error) {
      console.error("Error fetching resource:", error);
      const errorMessage = error.response?.data?.error || "Failed to fetch resource";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Update resource
  updateResource: async (id, resourceData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `http://localhost:5000/api/resources/${id}`,
        resourceData,
        { withCredentials: true }
      );
      
      set((state) => ({
        resources: state.resources.map((resource) =>
          resource._id === id ? response.data : resource
        ),
        loading: false,
      }));
      
      return { success: true, resource: response.data };
    } catch (error) {
      console.error("Error updating resource:", error);
      const errorMessage = error.response?.data?.error || "Failed to update resource";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Delete resource
  deleteResource: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`, {
        withCredentials: true,
      });
      
      set((state) => ({
        resources: state.resources.filter((resource) => resource._id !== id),
        totalResources: state.totalResources - 1,
        loading: false,
      }));
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting resource:", error);
      const errorMessage = error.response?.data?.error || "Failed to delete resource";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Get resources by type
  getResourcesByType: async (resourceType) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:5000/api/resources/type/${resourceType}`,
        { withCredentials: true }
      );
      set({ loading: false });
      return { success: true, resources: response.data };
    } catch (error) {
      console.error("Error fetching resources by type:", error);
      const errorMessage = error.response?.data?.error || "Failed to fetch resources by type";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  resetStore: () => set({
    resources: [],
    loading: false,
    error: null,
    totalResources: 0,
  }),
}));

export default useAdminResourceStore;