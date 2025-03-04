const mongoose = require('mongoose');
const Match = require('../models/match.model');

const seedMatches = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/wonderland', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Drop the existing collection
        await Match.collection.drop();
        console.log('Dropped existing wondermatch collection');

        // Generate game data to achieve a final score of 80 or 89
        const userId = 'user123'; // Replace with actual user ID
        const targetScore = 85; // Set target score to 80 or 89

        const matches = [];
        let totalRawScore = 0;
        let totalDeduction = 0;

        // Generate game data
        while (totalRawScore - totalDeduction < targetScore) {
            const difficulty = ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)];
            const score = Math.floor(Math.random() * 10) + 1; // Random score between 1 and 10
            const timeSpent = Math.floor(Math.random() * 60) + 1; // Random time spent between 1 and 60 seconds

            matches.push({
                userId,
                score,
                difficulty,
                timeSpent,
                playedAt: new Date(),
            });

            totalRawScore += score;

            // Deduct points based on difficulty level and time spent   
            if (difficulty === 'easy' && timeSpent >= 40) {
                totalDeduction += Math.floor((timeSpent - 20) / 20) * 5;
            } else if (difficulty === 'medium' && timeSpent >= 50) {
                totalDeduction += Math.floor((timeSpent - 25) / 25) * 3;
            } else if (difficulty === 'hard' && timeSpent >= 60) {
                totalDeduction += Math.floor((timeSpent - 30) / 30) * 1;
            }
        }

        // Insert generated game data
        await Match.insertMany(matches);
        console.log('Inserted new game data into wondermatch collection');

        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding match data:', error);
    }
};

seedMatches();