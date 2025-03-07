const User = require("../models/user.model");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure Mailtrap credentials are in .env
const { sendAutoDisableEmail } = require('../config/mailtrap');

// Mailtrap transporter configuration
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

// Get users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Toggle user status
const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isDisabled = status;
        await user.save();

        res.status(200).json({ message: `User status updated to ${status}`, user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user status", error });
    }
};

const autoDisableInactiveUsers = async () => {
    try {
        const today = new Date();
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);

        console.log(`Checking for users inactive since: ${oneMonthAgo.toISOString()}`);

        // Find users who have been inactive for 1+ month and are NOT disabled by admin
        const usersToDisable = await User.find({
            lastLogin: { $lte: oneMonthAgo },
            isDisabled: "enabled"  // Only active users should be marked inactive
        });

        if (usersToDisable.length === 0) {
            console.log("✅ No inactive users found for disabling.");
            return;
        }

        for (const user of usersToDisable) {
            user.isDisabled = "inactive";  // Mark as inactive
            await user.save();

            // Send notification email (without OTP)
            await sendAutoDisableEmail(user.email, user.username);

            console.log(`🔴 User ${user.username} marked as inactive due to inactivity.`);
        }

        console.log(`✅ ${usersToDisable.length} inactive users notified.`);
    } catch (error) {
        console.error("❌ Error auto-disabling users:", error);
    }
};
autoDisableInactiveUsers();

// 🔥 Run auto-disable every 24 hours
setInterval(autoDisableInactiveUsers, 24 * 60 * 60 * 1000); // Every 24 hours



module.exports = { getUsers, updateUserStatus, autoDisableInactiveUsers };
