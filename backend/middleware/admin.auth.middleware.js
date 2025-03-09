const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model.js");

const verifyAdmin = async (req, res, next) => {
  try {
    const adminToken = req.cookies.adminToken; 
    if (!adminToken) return res.status(403).json({ message: "Access Denied" });

    
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    
    const admin = await Admin.findById(decoded.userId);
    if (!admin || admin.username !== "admin" || decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized Access" }); 
    }

    req.admin = admin; 
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyAdmin;
