const express = require("express");
const { createReview, getReviews } = require("../controllers/review.controller");

const router = express.Router();

router.post("/submit", createReview); // ✅ Fix: Ensure the function exists
router.get("/all", getReviews);       // ✅ Fix: Ensure the function exists

module.exports = router;
