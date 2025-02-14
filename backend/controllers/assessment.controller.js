const Assess = require('../models/assessment.model');

const saveAssessment = async (req, res) => {
    try {
        console.log("Received request at /api/submit");
        console.log("Request body:", req.body);

        const userId = req.user ? req.user._id : req.body.userId;
        const { communication, emotional, routine, sensory, social, others } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

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

const getUserAssessment = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const assessment = await Assess.findOne({ userId });

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        res.status(200).json(assessment);
    } catch (error) {
        console.error("Error fetching assessment:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { saveAssessment, getUserAssessment };