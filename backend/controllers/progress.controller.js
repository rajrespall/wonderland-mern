const Match = require("../models/match.model");
const Card = require("../models/card.model");
const Puz = require("../models/puz.model");

const getProgressData = async (req, res) => {
    try {
        const userId = req.user._id;
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        // Get all games for the last 6 months
        const matches = await Match.find({
            userId,
            playedAt: { $gte: sixMonthsAgo }
        });

        const cards = await Card.find({
            userId,
            gameDate: { $gte: sixMonthsAgo }
        });

        const puzzles = await Puz.find({
            userId,
            playedAt: { $gte: sixMonthsAgo }
        });

        // Group data by month
        const monthlyData = [];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        for (let i = 0; i < 6; i++) {
            const currentMonth = new Date();
            currentMonth.setMonth(currentMonth.getMonth() - i);
            const monthStr = months[currentMonth.getMonth()];

            // Filter games for current month
            const monthMatches = matches.filter(m => 
                new Date(m.playedAt).getMonth() === currentMonth.getMonth()
            );
            const monthCards = cards.filter(c => 
                new Date(c.gameDate).getMonth() === currentMonth.getMonth()
            );
            const monthPuzzles = puzzles.filter(p => 
                new Date(p.playedAt).getMonth() === currentMonth.getMonth()
            );

            // Calculate metrics
            const completion = calculateCompletionRate(monthPuzzles, monthMatches, monthCards);
            const engagement = calculateEngagement(monthPuzzles, monthMatches, monthCards);
            const accuracy = calculateAccuracy(monthPuzzles, monthMatches, monthCards);

            monthlyData.unshift({
                month: monthStr,
                completion,
                engagement,
                accuracy,
                wonderPuz: monthPuzzles.length,
                wonderMatch: monthMatches.length,
                wonderCard: monthCards.length
            });
        }

        res.status(200).json(monthlyData);

    } catch (error) {
        console.error("Error fetching progress data:", error);
        res.status(500).json({ message: "Error fetching progress data" });
    }
};

// Helper functions for calculations
const calculateCompletionRate = (puzzles, matches, cards) => {
    const totalGames = puzzles.length + matches.length + cards.length;
    if (totalGames === 0) return 0;

    const completedPuzzles = puzzles.filter(p => p.isCompleted).length;
    const completedMatches = matches.length; // All matches are considered completed
    const completedCards = cards.filter(c => c.completed === 1).length;

    return Math.round(((completedPuzzles + completedMatches + completedCards) / totalGames) * 100);
};

const calculateEngagement = (puzzles, matches, cards) => {
    // Calculate average time spent across all games
    const totalGames = puzzles.length + matches.length + cards.length;
    if (totalGames === 0) return 0;

    const puzzleTime = puzzles.reduce((sum, p) => sum + p.timeSpent, 0);
    const matchTime = matches.reduce((sum, m) => sum + m.timeSpent, 0);
    const cardTime = cards.reduce((sum, c) => sum + c.timeTaken, 0);

    // Convert to engagement percentage (assuming 10 minutes per day is 100% engagement)
    const totalTimeInMinutes = (puzzleTime + matchTime + cardTime) / 60;
    return Math.min(Math.round((totalTimeInMinutes / 10) * 100), 100);
};

const calculateAccuracy = (puzzles, matches, cards) => {
    const totalGames = puzzles.length + matches.length + cards.length;
    if (totalGames === 0) return 0;

    // For puzzles: completion rate
    const puzzleAccuracy = puzzles.length > 0 
        ? (puzzles.filter(p => p.isCompleted).length / puzzles.length) * 100 
        : 0;

    // For matches: average score out of 10
    const matchAccuracy = matches.length > 0 
        ? matches.reduce((sum, m) => sum + m.score, 0) / matches.length * 10 
        : 0;

    // For cards: completed vs failed ratio
    const cardAccuracy = cards.length > 0 
        ? cards.reduce((sum, c) => sum + (c.completed * 100 / (c.failed + 1)), 0) / cards.length 
        : 0;

    // Average accuracy across all game types
    const activeTypes = (puzzles.length > 0) + (matches.length > 0) + (cards.length > 0);
    return Math.round((puzzleAccuracy + matchAccuracy + cardAccuracy) / (activeTypes || 1));
};

module.exports = { getProgressData };