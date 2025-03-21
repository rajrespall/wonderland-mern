const Admin = require("../models/admin.model.js");
const { adminAuth } = require("../config/firebase-admin");
const { generateAdminTokenandSetCookie } = require("../utils/generateTokenandSetCookie");
const { getAuth } = require("firebase-admin/auth");
const jwt = require("jsonwebtoken");



const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const admin = await Admin.findOne({ username });
    if (!admin || admin.username !== "admin") {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    
    try {
      const user = await getAuth().getUserByEmail("admin@wonderland.com");
      const validPassword = password === "admin123"; 

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid Password" });
      }
    } catch (authError) {
      console.error("Firebase Auth Error:", authError);
      return res.status(401).json({ message: "Authentication Failed" });
    }

    
    const adminToken = generateAdminTokenandSetCookie(res, admin._id, admin.username);

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



const checkAuth = async (req, res) => {
  try {
    const adminToken = req.cookies.adminToken; 

    if (!adminToken) {
      return res.status(401).json({ message: "No admin token found" });
    }

    
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    
    req.admin = { id: decoded.userId, username: decoded.username, role: decoded.role };
    res.status(200).json({ admin: req.admin });
  } catch (error) {
    console.error("Auth Check Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken", { 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logout successful" });
};


module.exports = { loginAdmin, checkAuth, logoutAdmin };
