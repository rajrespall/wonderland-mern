const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Card = require('../models/card.model');
const Puz = require('../models/puz.model');

dotenv.config();

// Function to drop collections before seeding new data
const dropCollections = async () => {
    try {
        console.log('⚡ Dropping existing collections...');
        await mongoose.connection.dropCollection('wondercards').catch(() => console.log("Collection 'wondercards' does not exist, skipping..."));
        await mongoose.connection.dropCollection('wonderpuz').catch(() => console.log("Collection 'wonderpuz' does not exist, skipping..."));
        console.log('✅ Collections dropped successfully.');
    } catch (error) {
        console.error('❌ Error dropping collections:', error);
    }
};

// Function to generate a Card record with a moderate score (~50)
const generateCardData = (userId, difficulty, failed, completed, timeTaken) => ({
    userId,
    gameDate: new Date(),
    failed,  // Moderate failures to keep score at ~50
    difficulty, 
    completed,  // 60% chance of completion
    timeTaken   // Moderate time to balance scoring
});

// Function to generate a Puzzle record with a moderate score (~50)
const generatePuzzleData = (userId, difficulty, isCompleted, timeSpent) => ({
    userId,
    difficulty,
    isCompleted,  // 70% completion rate, reducing over time
    timeSpent,   // Slightly increasing over time to reduce predictive score
    playedAt: new Date()
});

// Seeder function
const seedLogicalAbilityData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Fetch test user
        const user = await User.findOne({
            username: "testparent1",
            email: "testparent1@wonderland.com",
            isTestData: true
        });

        if (!user) {
            throw new Error('❌ User testparent1 not found. Exiting...');
        }
        console.log(`✅ Found user: ${user.username}, ID: ${user._id}`);

        // Drop collections before inserting new data
        await dropCollections();

        console.log('📊 Generating logical ability test data for testparent1...');

        // Generate data for two weeks ago (slightly higher score)
        const pastCardData = Array.from({ length: 25 }, () => 
            generateCardData(user._id, "Normal", Math.floor(Math.random() * 3) + 1, 1, Math.floor(Math.random() * 5) + 4)
        );
        const pastPuzzleData = Array.from({ length: 25 }, () => 
            generatePuzzleData(user._id, "medium", Math.random() > 0.75, Math.floor(Math.random() * 6) + 5)
        );

        // Generate data for last week (slightly worse performance)
        const recentCardData = Array.from({ length: 25 }, () => 
            generateCardData(user._id, "Normal", Math.floor(Math.random() * 5) + 3, Math.random() > 0.5 ? 1 : 0, Math.floor(Math.random() * 8) + 6)
        );
        const recentPuzzleData = Array.from({ length: 25 }, () => 
            generatePuzzleData(user._id, "medium", Math.random() > 0.6, Math.floor(Math.random() * 10) + 7)
        );

        // Insert Data
        const insertedCards = await Card.insertMany([...pastCardData, ...recentCardData]);
        const insertedPuzzles = await Puz.insertMany([...pastPuzzleData, ...recentPuzzleData]);

        console.log(`✅ Inserted ${insertedCards.length} cards and ${insertedPuzzles.length} puzzles.`);
        console.log('✅ 100 logical ability test data (50 past, 50 recent) seeded successfully for testparent1');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding logical ability test data:', error);
        process.exit(1);
    }
};

// Run the seeder
seedLogicalAbilityData();
