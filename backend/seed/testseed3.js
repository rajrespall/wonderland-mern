const mongoose = require("mongoose");
const Card = require("../models/card.model");
const Puz = require("../models/puz.model");
const { calculateLogicalAbility } = require("../services/predictiveAnalysis.services");

const seedDatabase = async () => {
    try {
        // 🌟 Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Connected to MongoDB");

        // 🌟 Drop Existing Data
        await Card.deleteMany({});
        await Puz.deleteMany({});
        console.log("⚠️ Existing Wondercards & Jigsaw Puzzles deleted");

        // 🌟 Insert Stable Data for "B" Grade (80-89 Score)
        const userId = new mongoose.Types.ObjectId(); // Simulate a user ID

        const wondercards = [
            { userId, gameDate: new Date(), failed: 2, completed: 8, difficulty: "Normal", timeTaken: 8 },
            { userId, gameDate: new Date(), failed: 1, completed: 10, difficulty: "Normal", timeTaken: 7 },
            { userId, gameDate: new Date(), failed: 3, completed: 7, difficulty: "Hard", timeTaken: 15 }
        ];

        const jigsawPuzzles = [
            { userId, playedAt: new Date(), isCompleted: true, difficulty: "Medium", timeSpent: 12 },
            { userId, playedAt: new Date(), isCompleted: true, difficulty: "Hard", timeSpent: 18 }
        ];

        await Card.insertMany(wondercards);
        await Puz.insertMany(jigsawPuzzles);
        console.log("✅ Inserted new stable data");

        // 🌟 Validate that the inserted data results in "B" Grade
        const logicalAbilityScore = await calculateLogicalAbility(userId);
        console.log(`📊 Logical Ability Score: ${logicalAbilityScore}`);

        if (logicalAbilityScore >= 80 && logicalAbilityScore < 90) {
            console.log("✅ Data is stable and results in a 'B' Grade");
        } else {
            console.warn("⚠️ WARNING: Score is not in 'B' range, adjust seed data if needed!");
        }

        // 🌟 Disconnect from Database
        mongoose.connection.close();
        console.log("✅ Database seeding complete & connection closed");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
        mongoose.connection.close();
    }
};

// Run Seeder
seedDatabase();
