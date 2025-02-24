const Assess = require('../models/assessment.model');
const User = require('../models/user.model');
const { analyzeAssessment } = require('../services/assessmentAnalysis.service');

const saveAssessment = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.body.userId;
        const assessmentData = {
            communication: req.body.communication,
            emotional: req.body.emotional,
            routine: req.body.routine,
            sensory: req.body.sensory,
            social: req.body.social,
            others: req.body.others
        };

        const analysisResults = analyzeAssessment(assessmentData);

        const newAssessment = new Assess({
            userId,
            ...assessmentData,
            analysis: analysisResults
        });

        const savedAssessment = await newAssessment.save();
        await User.findByIdAndUpdate(userId, { 
            hasCompletedAssessment: true,
            assessmentResults: analysisResults
        });

        res.status(201).json({ 
            message: "Assessment saved successfully", 
            data: savedAssessment,
            analysis: analysisResults 
        });
    } catch (error) {
        console.error("Error:", error);
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