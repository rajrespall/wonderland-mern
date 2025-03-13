const mongoose = require("mongoose");
const User = require("../models/user.model"); 
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("✅ Connected to MongoDB");

       
        const result = await User.updateOne(
            { _id: "67c7a9f49043f26007da3e7f" }, 
            { $set: { lastLogin: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000) } } 
        );

        console.log(`✅ Updated lastLogin to 23 days ago for testing sendAdvanceDisableEmail.`);
        mongoose.connection.close();
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));
