const express = require("express");
const { getUsersPerMonth, getGamesPlayed, getGameAnalytics, getGamesPlayedByDifficulty, getReviewsPerMonth } = require("../controllers/admin.chart.controller");
const router = express.Router();

router.get("/users-per-month", getUsersPerMonth);
router.get("/games-played", getGamesPlayed); // For Bar Graph
router.get("/game-analytics", getGameAnalytics); // For Game Analytics Table
router.get("/games-played-by-difficulty", getGamesPlayedByDifficulty); // For Pie Chart
router.get("/reviews-per-month", getReviewsPerMonth); // ✅ New Route

module.exports = router;
