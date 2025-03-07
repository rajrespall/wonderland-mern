const mongoose = require("mongoose");
const User = require("../models/user.model"); // Adjust path if needed
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("✅ Connected to MongoDB");

        // Set lastLogin to 2 months ago (simulate inactivity)
        const result = await User.updateOne(
            { _id: "67c7a9f49043f26007da3e7f" }, // Replace with correct ObjectId
            { $set: { lastLogin: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) } } // 2 months ago
        );

        console.log(`✅ Updated lastLogin to 2 months ago for testing`);
        mongoose.connection.close();
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));
