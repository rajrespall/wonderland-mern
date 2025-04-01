const User = require("../models/user.model");
const Match = require("../models/match.model");
const Card = require("../models/card.model");
const Color = require("../models/color.model");
const Puz = require("../models/puz.model");
const Review = require("../models/review.model"); 

const getUsersPerMonth = async (req, res) => {
    try {
        console.log("📊 Fetching user creation stats...");

        const usersPerMonth = await User.aggregate([
            {
                $group: {
                    _id: { 
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year then month
            }
        ]);

        console.log("📊 Raw Aggregation Data:", usersPerMonth);

        if (!usersPerMonth.length) {
            console.warn("⚠ No user data found!");
        }

        // Convert numeric month to name with year
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedData = usersPerMonth.map(item => ({
            name: `${monthNames[item._id.month - 1]} ${item._id.year}`,
            value: item.count,
            // Include raw data for sorting if needed
            sortKey: item._id.year * 100 + item._id.month
        }));

        // Ensure chronological order
        formattedData.sort((a, b) => a.sortKey - b.sortKey);

        console.log("📊 Formatted Data:", formattedData);

        res.json(formattedData);
    } catch (error) {
        console.error("❌ Error fetching users per month:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


const getGamesPlayed = async (req, res) => {
    try {
        console.log("📊 Fetching games played stats...");

        const matchCount = await Match.countDocuments();
        const cardCount = await Card.countDocuments();
        const colorCount = await Color.countDocuments();
        const puzzleCount = await Puz.countDocuments();

        const gamesData = [
            { name: "WonderMatch", value: matchCount },
            { name: "WonderCards", value: cardCount },
            { name: "WonderColor", value: colorCount },
            { name: "WonderPuz", value: puzzleCount },
        ];

        console.log("📊 Games Played Data:", gamesData);

        res.json(gamesData);
    } catch (error) {
        console.error("❌ Error fetching games played:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


const getGameAnalytics = async (req, res) => {
    try {
        console.log("📊 Fetching game analytics...");

        // Count total games played per game
        const matchTotalGames = await Match.countDocuments();
        const cardTotalGames = await Card.countDocuments();
        const colorTotalGames = await Color.countDocuments();
        const puzzleTotalGames = await Puz.countDocuments();

        // Count distinct users per game
        const matchPlayers = await Match.distinct("userId").then(users => users.length);
        const cardPlayers = await Card.distinct("userId").then(users => users.length);
        const colorPlayers = await Color.distinct("userId").then(users => users.length);
        const puzzlePlayers = await Puz.distinct("userId").then(users => users.length);

        // Calculate average score for WonderMatch
        const matchScores = await Match.aggregate([
            { $group: { _id: null, avgScore: { $avg: "$score" } } }
        ]);
        const avgMatchScore = matchScores.length > 0 ? matchScores[0].avgScore.toFixed(2) : 0;

        // Calculate average games per player per game
        const avgMatchPerPlayer = matchPlayers ? (matchTotalGames / matchPlayers).toFixed(2) : 0;
        const avgCardPerPlayer = cardPlayers ? (cardTotalGames / cardPlayers).toFixed(2) : 0;
        const avgColorPerPlayer = colorPlayers ? (colorTotalGames / colorPlayers).toFixed(2) : 0;
        const avgPuzzlePerPlayer = puzzlePlayers ? (puzzleTotalGames / puzzlePlayers).toFixed(2) : 0;

        const gamesAnalytics = [
            { name: "WonderMatch", players: matchPlayers, totalGames: matchTotalGames, avgGamesPerPlayer: avgMatchPerPlayer, averageScore: avgMatchScore },
            { name: "WonderCard", players: cardPlayers, totalGames: cardTotalGames, avgGamesPerPlayer: avgCardPerPlayer, averageScore: "N/A" },
            { name: "WonderColor", players: colorPlayers, totalGames: colorTotalGames, avgGamesPerPlayer: avgColorPerPlayer, averageScore: "N/A" },
            { name: "WonderPuz", players: puzzlePlayers, totalGames: puzzleTotalGames, avgGamesPerPlayer: avgPuzzlePerPlayer, averageScore: "N/A" },
        ];

        console.log("📊 Game Analytics Data:", gamesAnalytics);

        res.json(gamesAnalytics);
    } catch (error) {
        console.error("❌ Error fetching game analytics:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getGamesPlayedByDifficulty = async (req, res) => {
    try {
        console.log("📊 Fetching games played by difficulty...");

        // Count games based on difficulty levels for each game
        const easyGames = await Promise.all([
            Match.countDocuments({ difficulty: "easy" }),
            Card.countDocuments({ difficulty: "Easy" }), // Case-sensitive
            Puz.countDocuments({ difficulty: "easy" })
        ]).then(counts => counts.reduce((sum, count) => sum + count, 0));

        const mediumGames = await Promise.all([
            Match.countDocuments({ difficulty: "medium" }),
            Card.countDocuments({ difficulty: "Normal" }), // Case-sensitive
            Puz.countDocuments({ difficulty: "medium" })
        ]).then(counts => counts.reduce((sum, count) => sum + count, 0));

        const hardGames = await Promise.all([
            Match.countDocuments({ difficulty: "hard" }),
            Card.countDocuments({ difficulty: "Hard" }), // Case-sensitive
            Puz.countDocuments({ difficulty: "hard" })
        ]).then(counts => counts.reduce((sum, count) => sum + count, 0));

        // Prepare pie chart data
        const difficultyData = [
            { name: "Easy", value: easyGames },
            { name: "Medium", value: mediumGames },
            { name: "Hard", value: hardGames }
        ];

        console.log("📊 Difficulty-based Games Data:", difficultyData);
        res.json(difficultyData);
    } catch (error) {
        console.error("❌ Error fetching games played by difficulty:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getReviewsPerMonth = async (req, res) => {
    try {
        console.log("📊 Fetching reviews per month...");

        const reviewsPerMonth = await Review.aggregate([
            {
                $group: {
                    _id: { 
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        if (!reviewsPerMonth.length) {
            console.warn("⚠ No reviews found!");
        }

        // Convert numeric month to name with year
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedData = reviewsPerMonth.map(item => ({
            name: `${monthNames[item._id.month - 1]} ${item._id.year}`,
            value: item.count,
            sortKey: item._id.year * 100 + item._id.month
        }));

        // Ensure chronological order
        formattedData.sort((a, b) => a.sortKey - b.sortKey);

        console.log("📊 Reviews Per Month:", formattedData);
        res.json(formattedData);
    } catch (error) {
        console.error("❌ Error fetching reviews per month:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { getUsersPerMonth, getGamesPlayed, getGameAnalytics, getGamesPlayedByDifficulty, getReviewsPerMonth };
