const Profile = require('../models/profile.model');
const mongoose = require('mongoose');

// Get profile for current user
const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profile = await Profile.findOne({ userId });
        
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Failed to fetch profile", error: error.message });
    }
};

// Create or update profile
const upsertProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName, lastName, email, phoneNumber, address } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !phoneNumber || !address) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Get image from multer if it exists
        let profilePicture;
        if (req.file) {
            profilePicture = req.file.path; // Cloudinary URL
        }

        // Check if profile exists
        const existingProfile = await Profile.findOne({ userId });

        let profile;
        
        if (existingProfile) {
            // Update existing profile
            profile = await Profile.findOneAndUpdate(
                { userId },
                { 
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    // Only update profilePicture if a new one was uploaded
                    ...(profilePicture && { profilePicture }),
                    updatedAt: Date.now()
                },
                { new: true, runValidators: true }
            );
            
            return res.status(200).json({ message: "Profile updated successfully", profile });
        } else {
            // Create new profile
            profile = await Profile.create({
                userId,
                firstName,
                lastName,
                phoneNumber,
                address,
                profilePicture: profilePicture || ''
            });
            
            return res.status(201).json({ message: "Profile created successfully", profile });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        
        // Handle specific validation errors
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        
        res.status(500).json({ message: "Failed to update profile", error: error.message });
    }
};

module.exports = {
    getProfile,
    upsertProfile
};