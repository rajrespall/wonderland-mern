const mongoose = require('mongoose');
const dotenv = require('dotenv');
const moment = require('moment');
const User = require('../models/user.model');
const Card = require('../models/card.model');
const Puz = require('../models/puz.model');

dotenv.config();

/**
 * Generate Wondercard Data (Declining Performance)
 * - Failed attempts increase daily
 * - Time taken increases daily
 * - Completion rate decreases over time
 */
const generateDecliningCardData = (userId, daysAgo) => {
    const failed = Math.min(daysAgo * 2, 10); // Increase failures over time
    const timeTaken = 5 + daysAgo * 3; // Increase time over time
    const completed = Math.random() > (0.7 - daysAgo * 0.1) ? 1 : 0; // Lower completion rate over time

    return {
        userId,
        gameDate: moment().subtract(daysAgo, 'days').toDate(),
        failed,
        difficulty: daysAgo < 3 ? 'Easy' : daysAgo < 6 ? 'Normal' : 'Hard', // Harder games as time progresses
        completed,
        timeTaken
    };
};

/**
 * Generate Jigsaw Puzzle Data (Declining Performance)
 * - Time spent increases daily
 * - Completion rate decreases over time
 */
const generateDecliningPuzzleData = (userId, daysAgo) => {
    const timeSpent = 8 + daysAgo * 4; // Increase time spent
    const isCompleted = Math.random() > (0.7 - daysAgo * 0.1); // Lower completion rate over time

    return {
        userId,
        playedAt: moment().subtract(daysAgo, 'days').toDate(),
        timeSpent,
        difficulty: daysAgo < 3 ? 'easy' : daysAgo < 6 ? 'medium' : 'hard', // Harder difficulty as time progresses
        isCompleted
    };
};

/**
 * Drop and recreate collections (for fresh data)
 */
const dropAndRecreateCollections = async () => {
    try {
        console.log('⚡ Dropping collections and recreating them...');
        await mongoose.connection.dropCollection('wondercards').catch(err => console.log("Collection wondercards doesn't exist, skipping..."));
        await mongoose.connection.dropCollection('wonderpuz').catch(err => console.log("Collection wonderpuz doesn't exist, skipping..."));
        console.log('✅ Collections dropped successfully.');

        await mongoose.connection.createCollection('wondercards');
        await mongoose.connection.createCollection('wonderpuz');
        console.log('✅ Collections recreated successfully.');
    } catch (error) {
        console.error('❌ Error dropping/recreating collections:', error);
    }
};

/**
 * Seed declining performance data (10 games per day for 7 days)
 */
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

        // Generate 10 games per day for 7 days (5 Wondercards + 5 Puzzles per day)
        for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
            for (let i = 0; i < 5; i++) {
                cardData.push(generateDecliningCardData(user._id, daysAgo));
                puzzleData.push(generateDecliningPuzzleData(user._id, daysAgo));
            }
        }

        // Insert generated data into the database
        await Card.insertMany(cardData);
        await Puz.insertMany(puzzleData);

        console.log(`✅ Seeded ${cardData.length} Wondercards and ${puzzleData.length} Puzzles for declining performance over 7 days`);
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding declining performance data:', error);
        process.exit(1);
    }
};

// Run the seeder
seedLogicalAbilityData();
