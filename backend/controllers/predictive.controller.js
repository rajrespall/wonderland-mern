const jwt = require("jsonwebtoken");
const { calculateLogicalAbility, calculateTrend, currentMotor, predictiveMotor } = require('../services/predictiveAnalysis.services');


const getLogicalAbilityScore = async (req, res) => {
    try {
        let userId;

        if (req.user && req.user._id) {
            userId = req.user._id;
        } else {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: No token found" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded._id;
        }

        console.log("Fetching Logical Ability and Trend Analysis for user:", userId);

        // Fetch Scores
        const score = await calculateLogicalAbility(userId);
        const { growthPercentage, trend } = await calculateTrend(userId);

        console.log("Calculated Logical Ability Score:", score);
        console.log("Predicted Growth Percentage:", growthPercentage, "Trend:", trend);

        // Send response
        res.status(200).json({
            logicalAbilityScore: score,
            predictedScore: score + growthPercentage, // Predicts based on growth trend
            growthPercentage,
            trend
        });
    } catch (error) {
        console.error('Error fetching logical ability score:', error);
        res.status(500).json({ message: 'Error fetching logical ability score', error });
    }
};

const getMotorSkillsScore = async (req, res) => {
    try {
        let userId;

        if (req.user && req.user._id) {
            userId = req.user._id;
        } else {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: No token found" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded._id;
        }

        console.log("Fetching Motor Skills and Predictive Analysis for user:", userId);

        // Fetch Scores
        const score = await currentMotor(userId);
        const trend = await predictiveMotor(userId);

        console.log("Calculated Motor Skills Score:", score);
        console.log("Predicted Trend:", trend);

        // Send response
        res.status(200).json({
            motorSkillsScore: score,
            trend
        });
    } catch (error) {
        console.error('Error fetching motor skills score:', error);
        res.status(500).json({ message: 'Error fetching motor skills score', error });
    }
};

module.exports = { getLogicalAbilityScore, getMotorSkillsScore };



