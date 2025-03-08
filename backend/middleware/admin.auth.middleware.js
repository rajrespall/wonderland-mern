const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model.js"); 

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) return res.status(403).json({ message: "Access Denied" });

 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const admin = await Admin.findById(decoded.userId);
    if (!admin) return res.status(403).json({ message: "Invalid Admin" });

    req.admin = admin; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyAdmin;
