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

// Get user's games
const getUserGames = async (req, res) => {
    try {
        const userId = req.user._id;
        const games = await Match.find({ userId })
            .sort({ playedAt: -1 })
            .select('-__v');

        if (!games.length) {
            return res.status(200).json({ 
                message: 'No game data found', 
                data: [] 
            });
        }

        res.status(200).json(games);
    } catch (error) {
        console.error('Error fetching user games:', error);
        res.status(500).json({ error: 'Failed to fetch user games' });
    }
};

const getUserStats = async (req, res) => {
    try {
        const userId = req.user._id.toString();

        const stats = await Match.aggregate([
            { $match: { userId: userId } },
            { $group: {
                _id: '$difficulty',
                gamesPlayed: { $sum: 1 },
                averageScore: { $avg: '$score' },
                averageTimeSpent: { $avg: '$timeSpent' },
                highestScore: { $max: '$score' }
            }},
            { $sort: { _id: 1 } }
        ]);

        if (!stats.length) {
            return res.status(200).json({ 
                message: 'No stats available', 
                data: [] 
            });
        }
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ error: 'Failed to fetch user stats' });
    }
};

module.exports = {
    createMatch,
    getUserGames,
    getUserStats
};