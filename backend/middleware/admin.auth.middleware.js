const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model.js"); // ✅ Import admin model

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Read token from cookies
    if (!token) return res.status(403).json({ message: "Access Denied" });

    // Decode JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if admin exists in the database
    const admin = await Admin.findById(decoded.userId);
    if (!admin) return res.status(403).json({ message: "Invalid Admin" });

    req.admin = admin; // ✅ Attach admin data to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyAdmin;
