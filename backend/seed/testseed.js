const mongoose = require('mongoose');
const dotenv = require('dotenv');
const moment = require('moment');
const User = require('../models/user.model');
const Card = require('../models/card.model');
const Puz = require('../models/puz.model');

dotenv.config();

const generatePerfectCardData = (userId, daysAgo) => ({
    userId,
    gameDate: moment().subtract(daysAgo, 'days').toDate(), // Spread over 30 days
    failed: 0, // No failed attempts
    difficulty: ['Easy', 'Normal', 'Hard'][Math.floor(Math.random() * 3)], // Random difficulty
    completed: 1, // Always completed for max score
    timeTaken: Math.floor(Math.random() * 3) + 1 // Minimal time taken for max bonus
});

const generatePerfectPuzzleData = (userId, daysAgo) => ({
    userId,
    playedAt: moment().subtract(daysAgo, 'days').toDate(), // Spread over 30 days
    timeSpent: Math.floor(Math.random() * 5) + 1, // Minimal time spent for max bonus
    difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)], // Random difficulty
    isCompleted: true // Always completed for max score
});

const dropAndRecreateCollections = async () => {
    try {
        console.log('⚡ Dropping collections and recreating them...');

        // Drop existing collections (tables)
        await mongoose.connection.dropCollection('wondercards').catch(err => console.log("Collection wondercards doesn't exist, skipping..."));
        await mongoose.connection.dropCollection('wonderpuz').catch(err => console.log("Collection wonderpuz doesn't exist, skipping..."));

        console.log('✅ Collections dropped successfully.');

        // Recreate collections
        await mongoose.connection.createCollection('wondercards');
        await mongoose.connection.createCollection('wonderpuz');

        console.log('✅ Collections recreated successfully.');
    } catch (error) {
        console.error('❌ Error dropping/recreating collections:', error);
    }
};

const seedLogicalAbilityData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Find the test user
        const user = await User.findOne({ username: 'testparent1' });
        if (!user) throw new Error('❌ User testparent1 not found');

        // Drop collections and recreate them
        await dropAndRecreateCollections();

        let cardData = [];
        let puzzleData = [];

        // Generate 100 data (50 Wondercards + 50 Puzzles) evenly over 30 days
        for (let i = 0; i < 30; i++) {
            const numEntriesPerDay = Math.floor(100 / 30); // Distribute across 30 days

            for (let j = 0; j < numEntriesPerDay / 2; j++) {
                cardData.push(generatePerfectCardData(user._id, i));
                puzzleData.push(generatePerfectPuzzleData(user._id, i));
            }
        }

        // Insert generated data into the database
        await Card.insertMany(cardData);
        await Puz.insertMany(puzzleData);

        console.log(`✅ Seeded 100 logical ability test data (50 cards, 50 puzzles) over 30 days`);
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding logical ability test data:', error);
        process.exit(1);
    }
};

// Run the seeder
seedLogicalAbilityData();
