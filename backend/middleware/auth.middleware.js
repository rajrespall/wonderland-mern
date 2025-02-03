const jwt = require('jsonwebtoken');    
const User = require("../models/user.model.js");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({success: false, message: "No token found"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({success: false, message: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({success: false, message: "Invalid token"});
    }
};

module.exports = verifyToken;