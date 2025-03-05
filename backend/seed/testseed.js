const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const Card = require("../models/card.model");  // Wondercards
const Puz = require("../models/puz.model");    // Jigsaw Puzzles

dotenv.config();

// 🎯 Fetch the specific user (testparent1)
const fetchTestUser = async () => {
    return await User.findOne({ username: "testparent1", isTestData: true });
};

// 🎯 Function to generate game data ensuring **score of 90** with **gradual improvement**
const generateGameData = (gameType, dayIndex, difficulty) => {
    let failedAttempts;
    let completed = 1; // Always completed
    let timeSpent;

    // **Start with higher failures and slower times, then improve**
    if (difficulty === "Easy" || difficulty === "easy") {
        failedAttempts = Math.max(0, 5 - Math.floor(dayIndex / 3)); // Reducing every 3 days
        timeSpent = Math.max(2, 10 - Math.floor(dayIndex / 3)); // Reducing every 3 days
    } else if (difficulty === "Normal" || difficulty === "medium") {
        failedAttempts = Math.max(0, 7 - Math.floor(dayIndex / 4));
        timeSpent = Math.max(3, 12 - Math.floor(dayIndex / 4));
    } else if (difficulty === "Hard" || difficulty === "hard") {
        failedAttempts = Math.max(0, 9 - Math.floor(dayIndex / 5));
        timeSpent = Math.max(5, 15 - Math.floor(dayIndex / 5));
    }

    return {
        difficulty,
        failed: failedAttempts,
        completed,
        timeTaken: timeSpent, // For Wondercards
        timeSpent, // For Jigsaw Puzzles
        isCompleted: true, // For Jigsaw Puzzles
    };
};

// 🎯 Generate **5 games per day** for **30 days** with improving trend
const generateGameRecords = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const user = await fetchTestUser();
        if (!user) {
            console.log("❌ User testparent1 not found. Run user seeder first.");
            process.exit(1);
        }

        console.log("⚡ Generating 5 game records per day for 30 days for testparent1...");

        let gameRecords = [];
        for (let day = 0; day < 30; day++) {
            const gameDate = new Date();
            gameDate.setDate(gameDate.getDate() - day); // Set game date for each of the last 30 days

            // **Easy (2 games per day)**
            for (let i = 0; i < 2; i++) {
                gameRecords.push(Card.create({
                    userId: user._id,
                    gameDate,
                    ...generateGameData("Wondercards", day, "Easy"),
                }));
                gameRecords.push(Puz.create({
                    userId: user._id,
                    playedAt: gameDate,
                    ...generateGameData("JigsawPuzzle", day, "easy"),
                }));
            }

            // **Medium/Normal (2 games per day)**
            for (let i = 0; i < 2; i++) {
                gameRecords.push(Card.create({
                    userId: user._id,
                    gameDate,
                    ...generateGameData("Wondercards", day, "Normal"),
                }));
                gameRecords.push(Puz.create({
                    userId: user._id,
                    playedAt: gameDate,
                    ...generateGameData("JigsawPuzzle", day, "medium"),
                }));
            }

            // **Hard (1 game per day)**
            gameRecords.push(Card.create({
                userId: user._id,
                gameDate,
                ...generateGameData("Wondercards", day, "Hard"),
            }));
            gameRecords.push(Puz.create({
                userId: user._id,
                playedAt: gameDate,
                ...generateGameData("JigsawPuzzle", day, "hard"),
            }));
        }

        await Promise.all(gameRecords);
        console.log("✅ Successfully created **5 Wondercards & 5 Jigsaw Puzzles** per day for the last **30 days**.");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding game data:", error);
        process.exit(1);
    }
};

// Run the seeder
generateGameRecords();
