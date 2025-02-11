// controllers/assess.controller.js
const Assess = require('../models/assess.model');
const User = require('../models/user.model');

// controllers/assess.controller.js
const saveAssessment = async (req, res) => {
    try {
        console.log("Received request at /api/submit");
        console.log("Request body:", req.body);

        const userId = req.user ? req.user._id : req.body.userId;
        const { communication, emotional, routine, sensory, social, others } = req.body;

        console.log("Extracted userId:", userId);
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // Ensure all fields exist
        if (!communication || !emotional || !routine || !sensory || !social || !others) {
            return res.status(400).json({ message: "Incomplete data received", receivedData: req.body });
        }

        const newAssessment = new Assess({
            userId,
            communication,
            emotional,
            routine,
            sensory,
            social,
            others
        });

        const savedAssessment = await newAssessment.save();
        console.log("Saved to MongoDB:", savedAssessment);

        res.status(201).json({ message: "Assessment saved successfully", data: savedAssessment });
    } catch (error) {
        console.error("MongoDB Save Error:", error);
        res.status(500).json({ message: "Error saving assessment data", error });
    }
};



module.exports = { saveAssessment };
