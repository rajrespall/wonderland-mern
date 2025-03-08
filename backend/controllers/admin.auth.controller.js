const Admin = require("../models/admin.model.js");
const { adminAuth } = require("../config/firebase-admin");
const { generateTokenandSetCookie } = require("../utils/generateTokenandSetCookie");


const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid Credentials" });

    const userRecord = await adminAuth.getUser(admin.password);


    const token = generateTokenandSetCookie(res, admin._id);

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json({ admin: req.admin });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const logoutAdmin = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { loginAdmin, checkAuth, logoutAdmin };
