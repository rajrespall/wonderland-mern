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

        // Find previous assessments and get the latest version number
        const previousAssessments = await Assess.find({ userId }).sort({ version: -1 }).limit(1);
        const newVersion = previousAssessments.length > 0 ? previousAssessments[0].version + 1 : 1;
        
        // Mark previous assessments as not latest
        if (previousAssessments.length > 0) {
            await Assess.updateMany(
                { userId },
                { isLatest: false }
            );
        }

        // Create new assessment
        const newAssessment = new Assess({
            userId,
            version: newVersion,
            isLatest: true,
            assessmentDate: new Date(),
            ...assessmentData,
            analysis: analysisResults
        });

        const savedAssessment = await newAssessment.save();
        
        // Update user's reference to latest assessment
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
        const { version } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        let assessment;
        
        if (version) {
            // Get specific version if requested
            assessment = await Assess.findOne({ userId, version: parseInt(version) });
        } else {
            // Get latest assessment by default
            assessment = await Assess.findOne({ userId, isLatest: true });
        }

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        res.status(200).json(assessment);
    } catch (error) {
        console.error("Error fetching assessment:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Add new function to get assessment history
const getUserAssessmentHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const assessments = await Assess.find({ userId })
            .sort({ version: -1 })
            .select('version assessmentDate analysis.totalScore analysis.isaaCategory');

        res.status(200).json(assessments);
    } catch (error) {
        console.error("Error fetching assessment history:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { saveAssessment, getUserAssessment, getUserAssessmentHistory };