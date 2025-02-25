const Save = require('../models/card.model.js');

const saveGameData = async (req, res) => {
    const { gameDate, failed, difficulty, completed, timeTaken } = req.body;
    const userID = req.user._id;

    try {
       
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newSave.save(); 
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

const getUserGameData = async (req, res) => {
    try {
        const userID = req.user._id;
        const gameData = await Save.find({ userID })
            .sort({ gameDate: -1 }) // Sort by date, newest first
            .select('-__v'); // Exclude version key

        if (!gameData.length) {
            return res.status(200).json({ message: 'No game data found', data: [] });
        }

        res.status(200).json(gameData);
    } catch (error) {
        console.error('Error fetching user game data:', error);
        res.status(500).json({ message: 'Error fetching game data', error });
    }
};

const getUserStats = async (req, res) => {
    try {
        const userID = req.user._id;
        
        const stats = await Save.aggregate([
            { $match: { userID: userID } },
            { $group: {
                _id: '$difficulty',
                gamesPlayed: { $sum: 1 },
                averageTimeTaken: { $avg: '$timeTaken' },
                totalFailed: { $sum: '$failed' },
                completedGames: { $sum: '$completed' }
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
        res.status(500).json({ message: 'Error fetching stats', error });
    }
};

module.exports = { 
    saveGameData,
    getUserGameData,
    getUserStats
};