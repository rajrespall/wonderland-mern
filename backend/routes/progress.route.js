const express = require("express");
const { getProgressData } = require("../controllers/progress.controller");
const verifyToken = require('../middleware/auth.middleware.js');
const router = express.Router();

router.get("/", verifyToken, getProgressData);

module.exports = router;