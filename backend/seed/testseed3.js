const mongoose = require('mongoose');
const dotenv = require('dotenv');
const moment = require('moment');
const User = require('../models/user.model');
const Match = require('../models/match.model');

dotenv.config();

const userName = "testparent1"; // Test user

// Define difficulty levels
const difficulties = ["easy", "medium", "hard"];

// Function to generate match data
const generateMatchData = (userId, daysAgo) => {
    const matches = [];
    const now = new Date();

    for (let i = 0; i < 10; i++) { // Generate 10 games per day
        let difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        let score = Math.floor(Math.random() * 11); // Score between 0 and 10
        let timeSpent;

        // Assign realistic timeSpent values based on difficulty
        if (difficulty === "easy") {
            timeSpent = Math.floor(Math.random() * 80) + 20; // 20s to 100s
        } else if (difficulty === "medium") {
            timeSpent = Math.floor(Math.random() * 100) + 25; // 25s to 125s
        } else {
            timeSpent = Math.floor(Math.random() * 120) + 30; // 30s to 150s
        }

        // Calculate playedAt date
        let playedAt = moment(now).subtract(daysAgo, 'days')
            .hour(Math.floor(Math.random() * 24))
            .minute(Math.floor(Math.random() * 60))
            .toDate();

        // Push match data
        matches.push({
            userId,
            score,
            difficulty,
            timeSpent,
            playedAt
        });
    }
    return matches;
};

// Function to reset and seed matches
const seedMatches = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Find test user
        const user = await User.findOne({ username: userName });
        if (!user) throw new Error(`❌ User '${userName}' not found`);

        // Clear old match data for this user
        await Match.deleteMany({ userId: user._id });
        console.log(`⚡ Old match data for '${userName}' deleted`);

        let matchData = [];

        // Generate 10 games per day for 7 days
        for (let day = 0; day < 7; day++) {
            matchData.push(...generateMatchData(user._id, day));
        }

        // Insert into the database
        await Match.insertMany(matchData);
        console.log(`✅ Seeded ${matchData.length} matches for '${userName}'`);

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding match data:', error);
        process.exit(1);
    }
};

// Run the script
seedMatches();
