const User = require("../models/user.model");
const nodemailer = require("nodemailer");
require("dotenv").config(); 
const { sendAutoDisableEmail, sendAdvanceDisableEmail  } = require('../config/mailtrap');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

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
  
      const sevenDaysBeforeDisable = new Date(today);
      sevenDaysBeforeDisable.setDate(today.getDate() - 23); 
  
      console.log(`Checking for inactive users since: ${oneMonthAgo.toISOString()}`);
      console.log(`Checking for users to receive advance disable email since: ${sevenDaysBeforeDisable.toISOString()}`);
  
     
      const usersToDisable = await User.find({
        lastLogin: { $lte: oneMonthAgo },
        isDisabled: "enabled",
      });
  
   
      const usersForAdvanceEmail = await User.find({
        lastLogin: { $lte: sevenDaysBeforeDisable, $gt: oneMonthAgo }, 
        isDisabled: "enabled",
      });
  
   
      for (const user of usersForAdvanceEmail) {
        console.log(`📢 Sending advance disable warning to: ${user.username}`);
        await sendAdvanceDisableEmail(user.email, user.username);
      }
  
   
      for (const user of usersToDisable) {
        user.isDisabled = "inactive";  
        await user.save();
        
        await sendAutoDisableEmail(user.email, user.username);
        console.log(`🔴 User ${user.username} marked as inactive due to inactivity.`);
      }
  
      console.log(`✅ ${usersToDisable.length} users disabled.`);
      console.log(`✅ ${usersForAdvanceEmail.length} users notified in advance.`);
    } catch (error) {
      console.error("❌ Error auto-disabling users:", error);
    }
  };
autoDisableInactiveUsers();

setInterval(autoDisableInactiveUsers, 24 * 60 * 60 * 1000); 



module.exports = { getUsers, updateUserStatus, autoDisableInactiveUsers };
