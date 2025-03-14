const Donation = require('../models/donation.model');
const Profile = require('../models/profile.model');
const { cloudinary, upload } = require('../config/cloudinary');

class DonationController {
    async createDonation(req, res) {
        console.log("Request body:", req.body);
        console.log("User from Request:", req.user); 
    
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user detected" });
        }
    
        try {
            const userProfile = await Profile.findOne({ userId: req.user._id }).lean();

            console.log("Found Profile:", userProfile); 

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
                donationReceipt: imageUrl
            });
    
            await newDonation.save();
            res.status(201).json({ status: true, newDonation });
        }
        catch (error) {
            console.error("Error saving donation:", error);
            res.status(400).json({ message: "Donation not created", error });
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
