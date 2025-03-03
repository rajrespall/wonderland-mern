const Card = require('../models/card.model');
const Puz = require('../models/puz.model');
const mongoose = require('mongoose');
const Color = require('../models/color.model');
const Match = require('../models/match.model');

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

const currentMotor = async (userId) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Fetch all games played in the last 7 days
        const wondercards = await Card.find({ userId, gameDate: { $gte: sevenDaysAgo } });
        const wonderpuz = await Puz.find({ userId, playedAt: { $gte: sevenDaysAgo } });
        const wondercolor = await Color.find({ userId, createdAt: { $gte: sevenDaysAgo } });
        const wondermatch = await Match.find({ userId, playedAt: { $gte: sevenDaysAgo } });

        // Compute total score and count number of games
        let totalScore = 0;
        let totalGames = wondercards.length + wonderpuz.length + wondercolor.length + wondermatch.length;

        // Each game played earns 5 points
        totalScore += totalGames * 5;

        // Calculate inactivity penalties
        const lastPlayedDates = [
            ...wondercards.map(game => game.gameDate),
            ...wonderpuz.map(game => game.playedAt),
            ...wondercolor.map(game => game.createdAt),
            ...wondermatch.map(game => game.playedAt)
        ];

        if (lastPlayedDates.length > 0) {
            const lastPlayed = new Date(Math.max(...lastPlayedDates.map(date => new Date(date))));
            const daysInactive = Math.floor((new Date() - lastPlayed) / (1000 * 60 * 60 * 24));

            totalScore -= Math.floor(daysInactive / 3) * 3; // Deduct 3 points for every 3 days of inactivity
        }

        // 🔹 Compute the average score instead of percentage
        const avgScore = totalGames > 0 ? (totalScore / totalGames).toFixed(1) : 0;

        return avgScore; // Ensure a numeric value is returned
    } catch (error) {
        console.error("Error calculating motor skills score:", error);
        throw error;
    }
};


const predictiveMotor = async (userId) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Fetch all game records in the last 30 days
        const wondercards = await Card.find({ userId, gameDate: { $gte: thirtyDaysAgo } });
        const wonderpuz = await Puz.find({ userId, playedAt: { $gte: thirtyDaysAgo } });
        const wondercolor = await Color.find({ userId, createdAt: { $gte: thirtyDaysAgo } });
        const wondermatch = await Match.find({ userId, playedAt: { $gte: thirtyDaysAgo } });

        const dailyActivity = new Array(30).fill(0);
        let totalScore = 0;
        let totalDaysPlayed = 0;

        // Count the number of days played and accumulate scores
        [...wondercards, ...wonderpuz, ...wondercolor, ...wondermatch].forEach(game => {
            const daysAgo = Math.floor((new Date() - new Date(game.gameDate || game.playedAt || game.createdAt)) / (1000 * 60 * 60 * 24));
            if (daysAgo < 30) {
                dailyActivity[daysAgo]++;
                totalScore += 5; // Assuming 5 points per game played
                totalDaysPlayed++;
            }
        });

        // Calculate consistency ratio
        const daysPlayed = dailyActivity.filter(count => count > 0).length;
        const consistencyRatio = daysPlayed / 30;

        // Determine trend
        let trend = "neutral"; // Default to decreasing
        if (consistencyRatio > 0) trend = "improving";
        else if (consistencyRatio > 0) trend = "declining";

        // Calculate the average percentage of the score
        const avgScore = totalDaysPlayed > 0 ? (totalScore / totalDaysPlayed).toFixed(1) : 0;

        return { trend, avgScore };
    } catch (error) {
        console.error("Error calculating predictive motor trend:", error);
        return { trend: "stable", avgScore: 0 };
    }
};




module.exports = { calculateLogicalAbility, calculateTrend, currentMotor, predictiveMotor };

