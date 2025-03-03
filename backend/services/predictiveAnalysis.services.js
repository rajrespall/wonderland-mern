const Card = require('../models/card.model');
const Puz = require('../models/puz.model');
const mongoose = require('mongoose');

const calculateLogicalAbility = async (userId) => {
    try {
        // Fetch all Wondercards & Jigsaw Puzzles for the user
        const wondercards = await Card.find({ userId });
        const jigsawPuzzles = await Puz.find({ userId });

        console.log(`📊 Found ${wondercards.length} wondercards and ${jigsawPuzzles.length} puzzles for user ${userId}`);

        let totalScore = 0;
        let totalGames = wondercards.length + jigsawPuzzles.length || 1; // Prevent division by zero

        const calculateScore = (difficulty, failed, completed, timeSpent) => {
            let score = 0;

            if (difficulty === "Easy") {
                score -= failed;  // Deduct 1 point per failed attempt (only for Wondercards)
                
                if (!completed) {
                    score -= 5;  // Deduct 5 if not completed
                } else {
                    score += 1;  // Add 1 if completed
                }

                if (timeSpent <= 3) {
                    score += 1;  // Add 1 if completed in 3s or less
                } else if (timeSpent >= 6) {
                    score -= Math.floor(timeSpent / 6);  // Deduct 1 per full 6 seconds
                }
            } 
            else if (difficulty === "Normal" || difficulty === "Medium") {
                score -= Math.floor(failed / 3);  // Deduct 1 per 3 failed attempts (only for Wondercards)

                if (!completed) {
                    score -= 3;  // Deduct 3 if not completed
                } else {
                    score += 3;  // Add 3 if completed
                }

                if (timeSpent <= 6) {
                    score += 1;  // Add 1 if completed in 6s or less
                } else if (timeSpent >= 12) {
                    score -= Math.floor(timeSpent / 12);  // Deduct 1 per full 12 seconds
                }
            } 
            else if (difficulty === "Hard") {
                score -= Math.floor(failed / 10);  // Deduct 1 per 10 failed attempts (only for Wondercards)

                if (!completed) {
                    score -= 1;  // Deduct 1 if not completed
                } else {
                    score += 5;  // Add 5 if completed
                }

                if (timeSpent <= 10) {
                    score += 5;  // Add 5 if completed in 10s or less
                } else if (timeSpent >= 20) {
                    score -= Math.floor(timeSpent / 20);  // Deduct 1 per full 20 seconds
                }
            }

            return score;
        };

        // Process Wondercards
        wondercards.forEach(game => {
            totalScore += calculateScore(game.difficulty, game.failed, game.completed, game.timeTaken);
        });

        // Process Jigsaw Puzzles (No failed attempts)
        jigsawPuzzles.forEach(puzzle => {
            totalScore += calculateScore(puzzle.difficulty, 0, puzzle.isCompleted, puzzle.timeSpent);
        });

        // 1️⃣ Ensure the score stays between 0 and 100
        totalScore = Math.max(0, Math.min(100, totalScore));

        return Math.round(totalScore); // Return rounded value for UI display
    } catch (error) {
        console.error("Error calculating logical ability score:", error);
        throw error;
    }
};

const calculateTrend = async (userId) => {
    try {
        if (!userId) throw new Error("User ID is required for trend calculation");

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Fetch Wondercards & Puzzles for the specific user
        const wondercards = await Card.find({ userId, gameDate: { $gte: sevenDaysAgo } }).sort({ gameDate: 1 });
        const jigsawPuzzles = await Puz.find({ userId, playedAt: { $gte: sevenDaysAgo } }).sort({ playedAt: 1 });

        if (!wondercards.length && !jigsawPuzzles.length) {
            return { growthPercentage: 0, trend: "neutral" };
        }

        let failedAttempts = [];
        let timeTaken = [];
        let completedGames = [];

        // Process Wonder Cards
        wondercards.forEach(game => {
            failedAttempts.push(game.failed);
            timeTaken.push(game.timeTaken);
            completedGames.push(game.completed);
        });

        // Process Jigsaw Puzzles (No failed attempts)
        jigsawPuzzles.forEach(puzzle => {
            timeTaken.push(puzzle.timeSpent);
            completedGames.push(puzzle.isCompleted ? 1 : 0);
        });

        // Compute trend over 7 days
        const calculatePercentageChange = (arr) => {
            if (arr.length < 2) return 0;
            const first = arr[0];
            const last = arr[arr.length - 1];
            return ((last - first) / Math.abs(first || 1)) * 100;
        };

        const failedTrend = calculatePercentageChange(failedAttempts) * -1; // Lower failed is better
        const timeTrend = calculatePercentageChange(timeTaken) * -1; // Lower time is better
        const completedTrend = calculatePercentageChange(completedGames); // Higher completed is better

        // Calculate overall growth percentage (average of all factors)
        const totalTrend = (failedTrend + timeTrend + completedTrend) / 3;
        const growthPercentage = Math.round(totalTrend);

        // Determine trend label
        let trend = "neutral";
        if (growthPercentage > 0) trend = "improving";
        else if (growthPercentage < 0) trend = "declining";

        return { growthPercentage, trend };
    } catch (error) {
        console.error("❌ Error calculating trend:", error);
        return { growthPercentage: 0, trend: "neutral" };
    }
};



module.exports = { calculateLogicalAbility, calculateTrend };
