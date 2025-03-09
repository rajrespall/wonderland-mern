const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model.js");

const verifyAdmin = async (req, res, next) => {
  try {
    const adminToken = req.cookies.adminToken; // ✅ Read "adminToken" from cookies
    if (!adminToken) return res.status(403).json({ message: "Access Denied" });

    // ✅ Decode JWT Token
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    // ✅ Check if the admin exists in the database
    const admin = await Admin.findById(decoded.userId);
    if (!admin || admin.username !== "admin" || decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized Access" }); // ❌ Block unauthorized access
    }

    req.admin = admin; // ✅ Attach admin data to request object
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyAdmin;
