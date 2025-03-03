const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Card = require('../models/card.model'); // Wondercards
const Puz = require('../models/puz.model');   // Jigsaw Puzzles
const { calculateLogicalAbility } = require('../services/predictiveAnalysis.services');

dotenv.config();

const seedGameData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Fetch all test users
        const users = await User.find({ isTestData: true });
        if (!users.length) {
            console.log('❌ No test users found.');
            return process.exit();
        }

        // **Clear previous game data**
        await Card.deleteMany({ isTestData: true });
        await Puz.deleteMany({ isTestData: true });
        console.log('✅ Cleared previous game data');

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6); // 7 days ago

        for (let user of users) {
            console.log(`🟢 Seeding game data for: ${user.username}`);

            for (let day = 0; day < 7; day++) {
                let gameDate = new Date(startDate);
                gameDate.setDate(startDate.getDate() + day);

                for (let game = 0; game < 10; game++) {
                    const isTestParent1 = user.username === "testparent1";
                    
                    let difficulty, failedAttempts, timeTaken, completed;
                    
                    if (isTestParent1) {
                        // **Ensure Grade B (80-89) for testparent1**
                        difficulty = "Medium";
                        failedAttempts = Math.floor(Math.random() * 3); // Few failed attempts
                        timeTaken = 8; // Consistent time
                        completed = true;
                    } else {
                        // **Randomized scores for other users**
                        difficulty = ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)];
                        failedAttempts = Math.floor(Math.random() * 10);
                        timeTaken = Math.floor(Math.random() * 20);
                        completed = Math.random() > 0.5;
                    }

                    // Insert Wondercard game
                    await Card.create({
                        userId: user._id,
                        difficulty,
                        failed: failedAttempts,
                        timeTaken,
                        completed,
                        gameDate,
                        isTestData: true
                    });

                    // Insert Jigsaw Puzzle game
                    await Puz.create({
                        userId: user._id,
                        difficulty,
                        isCompleted: completed,
                        timeSpent: timeTaken,
                        playedAt: gameDate,
                        isTestData: true
                    });
                }
            }

            // **Verify `testparent1` logical ability**
            if (user.username === "testparent1") {
                let score = await calculateLogicalAbility(user._id);
                console.log(`🎯 Final Logical Ability Score for testparent1: ${score}`);
                if (score < 80 || score > 89) {
                    console.warn('⚠️ testparent1 score is outside Grade B range. Consider adjusting difficulty.');
                }
            }
        }

        console.log('✅ Game data seeding completed');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding game data:', error);
        process.exit(1);
    }
};

// Run the seeder
seedGameData();
