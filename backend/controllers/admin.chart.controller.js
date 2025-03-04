const User = require("../models/user.model");
const Match = require("../models/match.model");
const Card = require("../models/card.model");
const Color = require("../models/color.model");
const Puz = require("../models/puz.model");

const getUsersPerMonth = async (req, res) => {
    try {
        console.log("📊 Fetching user creation stats...");

        const usersPerMonth = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 } // Sort in ascending order (Jan to Dec)
            }
        ]);

        console.log("📊 Raw Aggregation Data:", usersPerMonth);

        if (!usersPerMonth.length) {
            console.warn("⚠ No user data found!");
        }

        // Convert numeric month to name
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedData = usersPerMonth.map(item => ({
            name: monthNames[item._id - 1],
            value: item.count
        }));

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

//put here  teh game analythic
module.exports = { getUsersPerMonth, getGamesPlayed, getGameAnalytics };
