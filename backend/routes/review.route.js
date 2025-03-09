const express = require("express");
const { createReview, getReviews, getUserReviews } = require("../controllers/review.controller");
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post("/submit", createReview); // ✅ Fix: Ensure the function exists
router.get("/all", getReviews);       // ✅ Fix: Ensure the function exists
router.get("/myreviews", verifyToken, getUserReviews);

module.exports = router;
