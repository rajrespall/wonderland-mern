const Donation = require('../models/donation.model');
const Profile = require('../models/profile.model');
const { cloudinary, upload } = require('../config/cloudinary');

class DonationController {
    async createDonation(req, res) {
        try {
            const userProfile = await Profile.findOne({ userId: req.user._id }).lean();

            if (!userProfile) {
                return res.status(404).json({ message: "Profile not found for this user." });
            }

            let imageUrl = null;
            if (req.file) {
                imageUrl = req.file.path;
            }

            const newDonation = new Donation({
                donator: userProfile._id,
                category: req.body.category,
                donationReceipt: imageUrl,
            });

            await newDonation.save();
            res.status(201).json({
                status: true,
                newDonation,
                message: "Donation created successfully",
            });
        } catch (error) {
            console.error("Error creating donation with user:", error);
            res.status(400).json({ message: "Failed to create donation", error });
        }
    }

    async createAnonymousDonation(req, res) {
        try {
            let imageUrl = null;
            if (req.file) {
                imageUrl = req.file.path;
            }

            const newDonation = new Donation({
                category: req.body.category,
                donationReceipt: imageUrl,
                isAnonymous: true,
                donator: null,
            });

            await newDonation.save();
            res.status(201).json({
                status: true,
                newDonation,
                message: "Anonymous donation created successfully",
            });
        } catch (error) {
            console.error("Error creating anonymous donation:", error);
            res.status(400).json({ message: "Failed to create anonymous donation", error });
        }
    }

    async getAllDonations(req, res) {   
        try {
            const donations = await Donation.find()
                .populate({
                    path: "donator",
                    model: "Profile",
                    select: "firstName lastName address profilePicture"
                });

            console.log("Fetched Donations:", donations);

            res.status(200).json(donations);
        } catch (error) {
            console.error("Error fetching donations:", error);
            res.status(500).json({ error: "Failed to load donations. Please try again." });
        }
    }

    async getDonationById(req, res) {
        try {
            const donation = await Donation.findById(req.params.id).populate("donator", "firstName lastName email address profilePicture");
            if (!donation) {
                return res.status(404).json({ message: "Donation not found" });
            }
            res.status(200).json(donation);
        } catch (error) {
            console.error("Error fetching donation by ID:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DonationController();
module.exports.upload = upload;
