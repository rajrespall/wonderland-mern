const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Card = require('../models/card.model');
const Puz = require('../models/puz.model');

dotenv.config();

// Function to drop existing collections
const dropCollections = async () => {
    try {
        console.log('⚡ Dropping existing collections...');

        await Card.deleteMany({});
        await Puz.deleteMany({});
        console.log('✅ Collections cleared successfully.');
    } catch (error) {
        console.error('❌ Error dropping collections:', error);
    }
};

// Function to generate Wondercards data for ~70 score
const generateBalancedCardData = (userId) => {
    const difficultyLevels = ['Easy', 'Normal', 'Hard'];
    const difficulty = difficultyLevels[Math.floor(Math.random() * 3)];

    let failed, timeTaken, completed;
    
    if (difficulty === "Easy") {
        failed = Math.floor(Math.random() * 2); // 0-1 failed attempts
        timeTaken = Math.floor(Math.random() * 4) + 2; // 2-6 seconds
    } else if (difficulty === "Normal") {
        failed = Math.floor(Math.random() * 3) + 1; // 1-3 failed attempts
        timeTaken = Math.floor(Math.random() * 6) + 4; // 4-10 seconds
    } else {
        failed = Math.floor(Math.random() * 5) + 2; // 2-6 failed attempts
        timeTaken = Math.floor(Math.random() * 10) + 5; // 5-15 seconds
    }

    completed = Math.random() > 0.2 ? 1 : 0; // 80% completion rate

    return {
        userId,
        gameDate: new Date(),
        failed,
        difficulty,
        completed,
        timeTaken
    };
};

// Function to generate Jigsaw Puzzles data for ~70 score
const generateBalancedPuzzleData = (userId) => {
    const difficultyLevels = ['easy', 'medium', 'hard'];
    const difficulty = difficultyLevels[Math.floor(Math.random() * 3)];

    let timeSpent;
    
    if (difficulty === "easy") {
        timeSpent = Math.floor(Math.random() * 4) + 2; // 2-6 seconds
    } else if (difficulty === "medium") {
        timeSpent = Math.floor(Math.random() * 6) + 4; // 4-10 seconds
    } else {
        timeSpent = Math.floor(Math.random() * 10) + 6; // 6-16 seconds
    }

    return {
        userId,
        timeSpent,
        difficulty,
        isCompleted: Math.random() > 0.3, // 70% completion rate
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
        const cardData = Array.from({ length: 50 }, () => generateBalancedCardData(user._id));
        const puzzleData = Array.from({ length: 50 }, () => generateBalancedPuzzleData(user._id));

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
