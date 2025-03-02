const jwt = require("jsonwebtoken");
const { calculateLogicalAbility, predictLogicalAbility } = require('../services/predictiveAnalysis.services');

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

        console.log("Fetching Logical Ability for user:", userId);

        const score = await calculateLogicalAbility(userId);
        const predictedScore = await predictLogicalAbility(userId);

        console.log("Calculated Logical Ability Score:", score);
        console.log("Predicted Logical Ability Score:", predictedScore);

        res.status(200).json({ logicalAbilityScore: score, predictedScore: predictedScore });
    } catch (error) {
        console.error('Error fetching logical ability score:', error);
        res.status(500).json({ message: 'Error fetching logical ability score', error });
    }
};

module.exports = { getLogicalAbilityScore };
