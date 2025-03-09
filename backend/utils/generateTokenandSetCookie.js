const jwt = require('jsonwebtoken');
const generateTokenandSetCookie = (res, userId) => {
    try {
        const token = jwt.sign(
            { userId }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate authentication token');
    }
};


const generateAdminTokenandSetCookie = (res, userId, username) => {
    try {
        // ✅ Create an admin-specific token
        const adminToken = jwt.sign(
            { userId, username, role: "admin" }, // ✅ Only admins get this token
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("adminToken", adminToken, { // ✅ Store admin token in a separate cookie
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return adminToken;
    } catch (error) {
        console.error("Error generating admin token:", error);
        throw new Error("Failed to generate admin authentication token");
    }
};

module.exports = { generateTokenandSetCookie, generateAdminTokenandSetCookie };