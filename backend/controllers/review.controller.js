const Review = require("../models/review.model");
const jwt = require("jsonwebtoken");

exports.createReview = async (req, res) => {
    try {
  
      const token = req.cookies.token;
      if (!token) {
        console.error("⛔ No token found in cookies.");
        return res.status(401).json({ message: "Unauthorized: No token" });
      }
  
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
  
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Unauthorized: Invalid token data" });
      }
  
      const userId = decoded.userId;
  
      const { rating, comment } = req.body;
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid rating value" });
      }
  
      const review = new Review({ userId, rating, comment });
      await review.save();
  
      res.status(201).json({ message: "Review submitted successfully", review });
  
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
};

exports.getReviews = async (req, res) => {
    try {
      const reviews = await Review.find().populate("userId", "username");
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error });
    }
};