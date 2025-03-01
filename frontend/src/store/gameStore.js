import { create } from 'zustand';
import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:5000/api';

// Reusable fetch function to reduce repetition
const fetchData = async (endpoint, errorMessage) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || errorMessage,
      error
    };
  }
};

const useGameDataStore = create((set, get) => ({
  // Game data
  puzzleData: [],
  cardData: [],
  matchData: [],
  
  // Statistics
  puzzleStats: null,
  cardStats: null,
  matchStats: null,
  
  // Status
  loading: false,
  error: null,

  // Unified method to fetch game data
  fetchGameData: async (gameType) => {
    set({ loading: true, error: null });
    try {
      const endpoint = `${gameType}/user-games`;
      const errorMsg = `Error fetching ${gameType} game data`;
      const data = await fetchData(endpoint, errorMsg);
      
      set({ 
        [`${gameType}Data`]: data,
        loading: false 
      });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error.error;
    }
  },

  // Unified method to fetch statistics
  fetchGameStats: async (gameType) => {
    set({ loading: true, error: null });
    try {
      const endpoint = `${gameType}/user-stats`;
      const errorMsg = `Error fetching ${gameType} statistics`;
      const data = await fetchData(endpoint, errorMsg);
      
      set({ 
        [`${gameType}Stats`]: data,
        loading: false 
      });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error.error;
    }
  },

  // Convenience methods (these call the unified methods)
  fetchPuzzleData: async () => get().fetchGameData('puz'),
  fetchCardData: async () => get().fetchGameData('card'),
  fetchMatchData: async () => get().fetchGameData('match'),
  fetchPuzzleStats: async () => get().fetchGameStats('puz'),
  fetchCardStats: async () => get().fetchGameStats('card'),
  fetchMatchStats: async () => get().fetchGameStats('match'),

  // Reset game data
  resetGameData: () => {
    set({ 
      puzzleData: [], 
      cardData: [], 
      matchData: [], 
      puzzleStats: null, 
      cardStats: null, 
      matchStats: null 
    });
  },

  // Helper to standardize time property access across game types
  getGameTime: (game) => {
    return game.timeSpent || game.timeTaken || 0;
  },

  // Helper to get stats for a specific difficulty
  getStatsForDifficulty: (gameType, difficulty) => {
    const stats = get()[`${gameType}Stats`] || [];
    const difficultyStats = Array.isArray(stats) ? stats.find(s => 
      s._id?.toLowerCase() === difficulty.toLowerCase()
    ) : {};
    
    return difficultyStats || {};
  }
}));

export default useGameDataStore;