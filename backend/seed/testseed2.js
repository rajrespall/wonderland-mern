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

// Function to generate a Wondercard record to maintain ~70 score
const generateHighScoreCardData = (userId) => {
    const difficultyLevels = ['Easy', 'Normal', 'Hard'];
    const difficulty = difficultyLevels[Math.floor(Math.random() * 3)];

    let failed, timeTaken, completed;
    
    if (difficulty === "Easy") {
        failed = Math.floor(Math.random() * 2) + 1; // Low failures (1-2)
        timeTaken = Math.floor(Math.random() * 4) + 2; // Fast time (2-6s)
    } else if (difficulty === "Normal") {
        failed = Math.floor(Math.random() * 4) + 2; // Moderate failures (2-5)
        timeTaken = Math.floor(Math.random() * 6) + 4; // Moderate time (4-10s)
    } else {
        failed = Math.floor(Math.random() * 6) + 3; // Some failures (3-8)
        timeTaken = Math.floor(Math.random() * 10) + 5; // Moderate time (5-15s)
    }

    completed = Math.random() > 0.2 ? 1 : 0; // 80% chance of being completed

    return {
        userId,
        gameDate: new Date(),
        failed,
        difficulty,
        completed,
        timeTaken
    };
};

// Function to generate a Jigsaw Puzzle record to maintain ~70 score
const generateHighScorePuzzleData = (userId) => {
    const difficultyLevels = ['easy', 'medium', 'hard'];
    const difficulty = difficultyLevels[Math.floor(Math.random() * 3)];

    let timeSpent;
    
    if (difficulty === "easy") {
        timeSpent = Math.floor(Math.random() * 5) + 2; // Fast time (2-7s)
    } else if (difficulty === "medium") {
        timeSpent = Math.floor(Math.random() * 8) + 4; // Moderate time (4-12s)
    } else {
        timeSpent = Math.floor(Math.random() * 12) + 6; // Higher time (6-18s)
    }

    return {
        userId,
        timeSpent,
        difficulty,
        isCompleted: Math.random() > 0.1, // 90% chance of being completed
        playedAt: new Date()
    };
};

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

        console.log('📊 Generating logical ability test data (~70 score) for testparent1...');

        // Generate Wondercard and Puzzle data
        const cardData = Array.from({ length: 50 }, () => generateHighScoreCardData(user._id));
        const puzzleData = Array.from({ length: 50 }, () => generateHighScorePuzzleData(user._id));

        // Insert Data
        const insertedCards = await Card.insertMany(cardData);
        const insertedPuzzles = await Puz.insertMany(puzzleData);

        console.log(`✅ Inserted ${insertedCards.length} cards and ${insertedPuzzles.length} puzzles.`);
        console.log('✅ 100 logical ability test data (50 Wondercards, 50 Puzzles) seeded successfully for testparent1');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding logical ability test data:', error);
        process.exit(1);
    }
};

// Run the seeder
seedLogicalAbilityData();
