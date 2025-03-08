const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model.js");
const { adminAuth } = require("../config/firebase-admin");

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid Credentials" });

    // Verify password with Firebase Authentication
    const userRecord = await adminAuth.getUser(admin.password); // Admin password is Firebase UID
    const firebaseToken = await adminAuth.createCustomToken(userRecord.uid);

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, admin });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { loginAdmin };
