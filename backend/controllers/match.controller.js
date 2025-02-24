// filepath: backend/controllers/match.controller.js
const Match = require('../models/match.model');

// Create a new match
const createMatch = async (req, res) => {
    try {
        const userId = req.user._id;
        const { score, difficulty, timeSpent } = req.body;

        const newMatch = new Match({
            userId,
            score,
            difficulty,
            timeSpent
        });

        const savedMatch = await newMatch.save();
        res.status(201).json(savedMatch);
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ error: 'Failed to create match' });
    }
};

// Get all matches
const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
};

// Get match by ID
const getMatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        res.status(200).json(match);
    } catch (error) {
        console.error('Error fetching match:', error);
        res.status(500).json({ error: 'Failed to fetch match' });
    }
};

module.exports = {
    createMatch,
    getAllMatches,
    getMatchById
};