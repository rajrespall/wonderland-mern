const Review = require("../models/review.model");
const Profile = require("../models/profile.model");
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
      let { rating, comment } = req.body;

      console.log("✅ Received rating from frontend:", rating, typeof rating); // Debugging log
      rating = Number(rating); // Convert to number (Ensure no string issues)

      if (!rating || rating < 1 || rating > 5) {
          console.error("⛔ Invalid rating received:", rating);
          return res.status(400).json({ message: "Invalid rating value" });
      }

      const review = new Review({ userId, rating, comment });
      await review.save();

      console.log("✅ Review saved:", review); // Debugging log
      res.status(201).json({ message: "Review submitted successfully", review });

  } catch (error) {
      console.error("❌ Error saving review:", error);
      res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getReviews = async (req, res) => {
  try {
      const reviews = await Review.find().populate("userId", "username");

      // Fetch user profiles and attach profile pictures
      const userIds = reviews.map(review => review.userId?._id); // Extract user IDs
      const profiles = await Profile.find({ userId: { $in: userIds } }, "userId profilePicture");

      // Map profile pictures to reviews
      const reviewsWithProfile = reviews.map(review => {
          const userProfile = profiles.find(profile => profile.userId.toString() === review.userId?._id.toString());
          return {
              ...review.toObject(),
              profilePicture: userProfile ? userProfile.profilePicture : null // Use profile picture or null
          };
      });

      res.status(200).json(reviewsWithProfile);
  } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error });
  }
};
    
exports.getUserReviews = async (req, res) => {
  try {
      const userId = req.userId;
      const reviews = await Review.find({ userId }).populate("userId", "username");

      const profile = await Profile.findOne({ userId }, "profilePicture");

      const reviewsWithProfile = reviews.map(review => ({
          ...review.toObject(),
          profilePicture: profile ? profile.profilePicture : null 
      }));
  
      res.status(200).json(reviewsWithProfile);
  } catch (error) {
      res.status(500).json({ message: "Error fetching user reviews", error });
  }
};