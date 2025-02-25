const Review = require("../models/review.model");
const jwt = require("jsonwebtoken");

exports.createReview = async (req, res) => {
    try {
      console.log("🔍 Incoming request:", req.body);
  
      // Get token from cookies
      const token = req.cookies.token;
      if (!token) {
        console.error("⛔ No token found in cookies.");
        return res.status(401).json({ message: "Unauthorized: No token" });
      }
  
      console.log("🔍 Token received:", token);
  
      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token decoded:", decoded);
      } catch (err) {
        console.error("⛔ Invalid token:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
  
      if (!decoded || !decoded.userId) { // ✅ Fix: Check "userId" instead of "id"
        console.error("⛔ Missing user ID in token.");
        return res.status(401).json({ message: "Unauthorized: Invalid token data" });
      }
  
      const userId = decoded.userId; // ✅ Fix: Extract userId correctly
      console.log("✅ User ID extracted:", userId);
  
      // Validate input
      const { rating, comment } = req.body;
      if (!rating || rating < 1 || rating > 5) {
        console.error("⚠️ Invalid rating:", rating);
        return res.status(400).json({ message: "Invalid rating value" });
      }
  
      // Save review to database
      const review = new Review({ userId, rating, comment });
      await review.save();
  
      console.log("✅ Review saved:", review);
      res.status(201).json({ message: "Review submitted successfully", review });
  
    } catch (error) {
      console.error("🔥 Server error:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
};

// ✅ Fix: Define and export getReviews
exports.getReviews = async (req, res) => {
    try {
      console.log("📢 Fetching all reviews...");
      const reviews = await Review.find().populate("userId", "username"); // ✅ Populate user info
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error("🔥 Error fetching reviews:", error);
      res.status(500).json({ message: "Error fetching reviews", error });
    }
    
};
