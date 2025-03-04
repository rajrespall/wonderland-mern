const express = require("express");
const { getUsersPerMonth, getGamesPlayed, getGameAnalytics } = require("../controllers/admin.chart.controller");
const router = express.Router();

router.get("/users-per-month", getUsersPerMonth);
router.get("/games-played", getGamesPlayed); // For Bar Graph
router.get("/game-analytics", getGameAnalytics); // For Game Analytics Table

module.exports = router;
