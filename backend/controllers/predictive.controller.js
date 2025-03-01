const { calculateLogicalAbility } = require('../services/predictiveAnalysis.services');

const getLogicalAbilityScore = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("Fetching Logical Ability for user:", userId); // Debugging Log

        const score = await calculateLogicalAbility(userId);
        console.log("Calculated Logical Ability Score:", score); // Debugging Log

        res.status(200).json({ logicalAbilityScore: score });
    } catch (error) {
        console.error('Error fetching logical ability score:', error);
        res.status(500).json({ message: 'Error fetching logical ability score', error });
    }
};

module.exports = { getLogicalAbilityScore };
