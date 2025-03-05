const { cloudinary } = require('../config/cloudinary.js');
const Color = require('../models/color.model.js');

const uploadImage = async (req, res) => {
    try {
        const { imageData } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        if (!imageData) {
            return res.status(400).json({
                success: false,
                message: "No image data provided"
            });
        }

        // Upload to Cloudinary
        let uploadResponse;
        try {
            uploadResponse = await cloudinary.uploader.upload(imageData, {
                folder: 'colorbook',
                resource_type: 'image',
                format: 'png'
            });
        } catch (cloudinaryError) {
            console.error('Cloudinary Upload Error:', cloudinaryError);
            return res.status(500).json({
                success: false,
                message: "Failed to upload image to cloud storage",
                error: cloudinaryError.message
            });
        }

        // Save to database
        const image = await Color.create({
            userId: req.user._id,
            imageUrl: uploadResponse.secure_url,
            cloudinaryId: uploadResponse.public_id
        });

        return res.status(201).json({
            success: true,
            image: {
                id: image._id,
                url: image.imageUrl,
                cloudinaryId: image.cloudinaryId,
                createdAt: image.createdAt
            }
        });

    } catch (error) {
        console.error("Color Upload Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error uploading image"
        });
    }
};

// New function to get all user's images
const getUserImages = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const images = await Color.find({ userId: req.user._id })
            .sort({ createdAt: -1 }) // Sort by newest first
            .select('imageUrl cloudinaryId createdAt'); // Select only needed fields

        return res.status(200).json({
            success: true,
            count: images.length,
            images
        });

    } catch (error) {
        console.error("Error fetching user images:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error retrieving images"
        });
    }
};

module.exports = { uploadImage, getUserImages };