const Card = require('../models/card.model');
const Puz = require('../models/puz.model');

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


const predictLogicalAbility = async (userId) => {
    try {
        const lastWeekScore = await calculateLogicalAbility(userId);
        const twoWeeksAgoScore = await calculateLogicalAbility(userId);

        console.log(`Last Week Score: ${lastWeekScore}, Two Weeks Ago Score: ${twoWeeksAgoScore}`);

        let trend = lastWeekScore - twoWeeksAgoScore;
        let predictedScore = lastWeekScore;  // Start with last week's score

        // 🔹 Adjust prediction based on trend
        if (trend > 0) {
            predictedScore += Math.min(2, trend); // Limit to +2
        } else if (trend < 0) {
            predictedScore -= Math.min(2, Math.abs(trend)); // Limit to -2
        }

        // 🔹 Deduct points based on failed attempts (NO COMPLETION CHECKS)
        const wondercards = await Card.find({ userId });

        wondercards.forEach(game => {
            if (game.difficulty === "Easy") {
                predictedScore -= game.failed;  // Deduct 1 per failed attempt
            } else if (game.difficulty === "Normal" || game.difficulty === "Medium") {
                predictedScore -= Math.floor(game.failed / 3);  // Deduct 1 per 3 failed attempts
            } else if (game.difficulty === "Hard") {
                predictedScore -= Math.floor(game.failed / 10);  // Deduct 1 per 10 failed attempts
            }
        });

        // 🔹 Scale down Puzzle Bonuses
        let puzzleBonus = 0;
        const jigsawPuzzles = await Puz.find({ userId });

        jigsawPuzzles.forEach(puzzle => {
            if (puzzle.difficulty === "easy" && puzzle.isCompleted && puzzle.timeSpent <= 3) {
                puzzleBonus += 1;
            } else if (puzzle.difficulty === "medium" && puzzle.isCompleted && puzzle.timeSpent <= 6) {
                puzzleBonus += 1;
            } else if (puzzle.difficulty === "hard" && puzzle.isCompleted && puzzle.timeSpent <= 10) {
                puzzleBonus += 5;
            }
        });

        // Limit Puzzle Bonus to prevent excessive score jumps
        puzzleBonus = Math.min(5, puzzleBonus);
        predictedScore += puzzleBonus;

        // Ensure predicted score stays between 0 and 100
        predictedScore = Math.max(0, Math.min(100, predictedScore));

        console.log(`Predicted Score: ${Math.round(predictedScore)}`);
        return Math.round(predictedScore);
    } catch (error) {
        console.error("Error predicting logical ability score:", error);
        throw error;
    }
};



module.exports = { calculateLogicalAbility, predictLogicalAbility };
