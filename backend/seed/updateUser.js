const mongoose = require("mongoose");
const User = require("../models/user.model");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("✅ Connected to MongoDB");

        // Update all users to set isDisabled to "enabled"
        const enableUsersResult = await User.updateMany(
            { isDisabled: { $ne: "enabled" } }, // Only update users who are not already enabled
            { $set: { isDisabled: "enabled" } } // Set isDisabled to "enabled"
        );

        console.log(`✅ ${enableUsersResult.modifiedCount} users updated to 'enabled'`);

        mongoose.connection.close();
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));
