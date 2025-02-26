// frontend/src/store/gameDataStore.js
import { create } from 'zustand';
import axios from 'axios';

const useGameDataStore = create((set) => ({
  puzzleData: [],
  cardData: [],
  matchData: [],
  loading: false,
  error: null,
  puzzleStats: null,
  cardStats: null,
  matchStats: null,

  // Fetch puzzle game data for current user
  fetchPuzzleData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/puz/user-games', {
        withCredentials: true
      });
      set({ 
        puzzleData: response.data, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching puzzle game data", 
        loading: false 
      });
      throw error;
    }
  },

  // Get user statistics for puzzle game
  fetchPuzzleStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/puz/user-stats', {
        withCredentials: true
      });
      set({ 
        puzzleStats: response.data, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching puzzle statistics", 
        loading: false 
      });
      throw error;
    }
  },

  // Fetch memory game data for current user
  fetchCardData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/card/user-games', {
        withCredentials: true
      });
      set({ 
        cardData: response.data, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching memory game data", 
        loading: false 
      });
      throw error;
    }
  },

  // Get user statistics for memory game
  fetchCardStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/card/user-stats', {
        withCredentials: true
      });
      set({ 
        cardStats: response.data, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching memory statistics", 
        loading: false 
      });
      throw error;
    }
  },

  // Fetch match game data for current user
  fetchMatchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/match/user-games', {
        withCredentials: true
      });
      set({ 
        matchData: response.data, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching match game data", 
        loading: false 
      });
      throw error;
    }
  },

  // Get user statistics for match game
  fetchMatchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:5000/api/match/user-stats', {
        withCredentials: true
      });
      set({ 
        matchStats: response.data, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching match statistics", 
        loading: false 
      });
      throw error;
    }
  },

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
  }

}));

export default useGameDataStore;