const Card = require('../models/card.model');

const calculateLogicalAbility = async (userId) => {
    try {
        const games = await Card.find({ userId });

        let totalScore = 0;

        games.forEach(game => {
            let { difficulty, failed, completed, timeTaken } = game;
            let score = 0;

            if (difficulty === "Easy") {
                score -= failed;  // Deduct 1 point per failed attempt
                
                if (completed === 0) {
                    score -= 5;  // Deduct 5 if not completed
                } else {
                    score += 1;  // Add 1 if completed
                }

                if (timeTaken <= 3) {
                    score += 1;  // Add 1 if completed in 3s or less
                } else if (timeTaken >= 6) {
                    score -= Math.floor(timeTaken / 6);  // Deduct 1 per full 6 seconds
                }
            } 
            else if (difficulty === "Normal") {
                score -= Math.floor(failed / 3);  // Deduct 1 per 3 failed attempts

                if (completed === 0) {
                    score -= 3;  // Deduct 3 if not completed
                } else {
                    score += 3;  // Add 3 if completed
                }

                if (timeTaken <= 6) {
                    score += 1;  // Add 1 if completed in 6s or less
                } else if (timeTaken >= 12) {
                    score -= Math.floor(timeTaken / 12);  // Deduct 1 per full 12 seconds
                }
            } 
            else if (difficulty === "Hard") {
                score -= Math.floor(failed / 10);  // Deduct 1 per 10 failed attempts

                if (completed === 0) {
                    score -= 1;  // Deduct 1 if not completed
                } else {
                    score += 5;  // Add 5 if completed
                }

                if (timeTaken <= 10) {
                    score += 5;  // Add 5 if completed in 10s or less
                } else if (timeTaken >= 20) {
                    score -= Math.floor(timeTaken / 20);  // Deduct 1 per full 20 seconds
                }
            }

            totalScore += score;
        });

        return totalScore;
    } catch (error) {
        console.error("Error calculating logical ability score:", error);
        throw error;
    }
};

module.exports = { calculateLogicalAbility };
