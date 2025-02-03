const GeneralInfo = require("../models/geninfo.model");

// Create general info
const createGeneralInfo = async (req, res) => {
    try {
        const { childName, dateOfBirth, gender, diagnosisYear } = req.body;
        const userId = req.user._id; // From auth middleware

        // Calculate diagnosis age
        const birthYear = new Date(dateOfBirth).getFullYear();
        const diagnosisAge = diagnosisYear - birthYear;

        // Validate inputs
        if (!childName || !dateOfBirth || !gender || !diagnosisYear) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create general info
        const generalInfo = await GeneralInfo.create({
            userId,
            childName,
            dateOfBirth,
            gender,
            diagnosisYear,
            diagnosisAge
        });

        res.status(201).json(generalInfo);

    } catch (error) {
        console.error("Error creating general info:", error);
        res.status(500).json({ error: "Failed to create general info" });
    }
};

// Get general info
const getGeneralInfo = async (req, res) => {
    try {
        const userId = req.user._id;
        const generalInfo = await GeneralInfo.findOne({ userId });
        
        if (!generalInfo) {
            return res.status(404).json({ error: "General info not found" });
        }

        res.status(200).json(generalInfo);

    } catch (error) {
        console.error("Error fetching general info:", error);
        res.status(500).json({ error: "Failed to fetch general info" });
    }
};

// Update general info
const updateGeneralInfo = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        // Recalculate diagnosis age if needed
        if (updates.dateOfBirth && updates.diagnosisYear) {
            const birthYear = new Date(updates.dateOfBirth).getFullYear();
            updates.diagnosisAge = updates.diagnosisYear - birthYear;
        }

        const generalInfo = await GeneralInfo.findOneAndUpdate(
            { userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!generalInfo) {
            return res.status(404).json({ error: "General info not found" });
        }

        res.status(200).json(generalInfo);

    } catch (error) {
        console.error("Error updating general info:", error);
        res.status(500).json({ error: "Failed to update general info" });
    }
};

module.exports = {
    createGeneralInfo,
    getGeneralInfo,
    updateGeneralInfo
};