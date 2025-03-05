const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Match = require('../models/match.model');

dotenv.config();

// Function to calculate the final score based on time spent deductions
const calculateFinalScore = (matches) => {
    let totalRawScore = 0;
    let totalDeduction = 0;

    matches.forEach(match => {
        let score = match.score; // Base score
        let timeSpent = match.timeSpent;

        totalRawScore += score;

        if (match.difficulty === "easy") {
            if (timeSpent >= 40) {
                totalDeduction += Math.floor((timeSpent - 20) / 20) * 5;
            }
        } else if (match.difficulty === "medium") {
            if (timeSpent >= 50) {
                totalDeduction += Math.floor((timeSpent - 25) / 25) * 3;
            }
        } else if (match.difficulty === "hard") {
            if (timeSpent >= 60) {
                totalDeduction += Math.floor((timeSpent - 30) / 30) * 1;
            }
        }
    });

    let finalScore = totalRawScore - totalDeduction;
    return Math.max(0, finalScore); // Ensure score is not negative
};

// Generate match data ensuring final score is between 80-90
const generateMatchData = () => {
    let matches = [];
    let totalRawScore = 0;
    let totalDeduction = 0;

    for (let i = 0; i < 5; i++) { // Create 5 matches per user
        const difficultyLevels = ["easy", "medium", "hard"];
        const difficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

        let score = 10; // Assign a base score of 10 (max)
        let timeSpent = 10; // Default minimal time spent to avoid high deductions

        if (difficulty === "easy") {
            timeSpent = Math.floor(Math.random() * 20) + 10; // 10-30 seconds (low deductions)
        } else if (difficulty === "medium") {
            timeSpent = Math.floor(Math.random() * 25) + 15; // 15-40 seconds
        } else {
            timeSpent = Math.floor(Math.random() * 30) + 20; // 20-50 seconds
        }

        // Add raw score
        totalRawScore += score;

        // Calculate deductions
        if (difficulty === "easy" && timeSpent >= 40) {
            totalDeduction += Math.floor((timeSpent - 20) / 20) * 5;
        } else if (difficulty === "medium" && timeSpent >= 50) {
            totalDeduction += Math.floor((timeSpent - 25) / 25) * 3;
        } else if (difficulty === "hard" && timeSpent >= 60) {
            totalDeduction += Math.floor((timeSpent - 30) / 30) * 1;
        }

        matches.push({ score, difficulty, timeSpent });
    }

    let finalScore = totalRawScore - totalDeduction;
    finalScore = Math.max(0, finalScore); // Ensure final score is not negative

    // Adjust last match if finalScore is not exactly 80
    if (finalScore > 80) {
        let excess = finalScore - 80;
        for (let match of matches) {
            if (match.score > 5) {
                match.score -= excess; // Reduce score to fix the final value
                break;
            }
        }
    }

    return matches;
};


const seedMatches = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Fetch test users
        const testUsers = await User.find({ isTestData: true });

        if (!testUsers.length) {
            console.log("❌ No test users found. Run the user seeder first.");
            process.exit(1);
        }

        console.log('⚡ Seeding match data for users...');

        for (const user of testUsers) {
            console.log(`⚡ Generating matches for user: ${user.username} (${user.email})`);

            const matchData = generateMatchData();
            const formattedMatches = matchData.map(match => ({
                userId: user._id,
                score: match.score,
                difficulty: match.difficulty,
                timeSpent: match.timeSpent,
                playedAt: new Date()
            }));

            await Match.insertMany(formattedMatches);
            console.log(`✅ Successfully created 5 match records for ${user.username}`);
        }

        console.log('✅ Match data seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding match data:', error);
        process.exit(1);
    }
};

seedMatches();
