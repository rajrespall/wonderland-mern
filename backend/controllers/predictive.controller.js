const jwt = require("jsonwebtoken");
const { calculateLogicalAbility, calculateTrend, currentMotor, predictiveMotor, currentSocial, predictiveSocial, currentColor, predictiveColor } = require('../services/predictiveAnalysis.services');


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

        // Fetch Scores
        const score = await calculateLogicalAbility(userId);
        const { growthPercentage, trend } = await calculateTrend(userId);

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

        // Fetch Scores
        const score = await currentMotor(userId);
        const trend = await predictiveMotor(userId);

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


const getSocialCommunicationScore = async (req, res) => {
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

        const socialScore = await currentSocial(userId);
        const trend = await predictiveSocial(userId);

        res.status(200).json({
            socialCommunicationScore: socialScore,
            trend
        });
    } catch (error) {
        console.error('Error fetching social communication score:', error);
        res.status(500).json({ message: 'Error fetching social communication score', error });
    }
};



const getCreativityScore = async (req, res) => {
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

        const creativityScore = await currentColor(userId);
        const trend = await predictiveColor(userId);

        res.status(200).json({
            creativityScore,
            trend
        });
    } catch (error) {
        console.error("❌ Error fetching creativity score:", error);
        res.status(500).json({ message: "Error fetching creativity score", error });
    }
};


module.exports = { getLogicalAbilityScore, getMotorSkillsScore, getSocialCommunicationScore, getCreativityScore };



