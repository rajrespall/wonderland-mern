const Assess = require('../models/assess.model');

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

module.exports = { getUserAssessment };
