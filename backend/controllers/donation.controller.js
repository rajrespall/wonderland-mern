const Donation = require('../models/donation.model');
const { cloudinary, upload } = require('../config/cloudinary');

class DonationController {
    async createDonation(req, res) {
        console.log(req.body);
        const donator = req.user._id;
        const donation = req.body;
        try {
            let imageUrl = null;
            if (req.file) {
                imageUrl = req.file.path;
            }

            const newDonation = new Donation({
                donator: donator,
                donationAmount: donation.donationAmount,
                paymentMethod: donation.paymentMethod,
                donationReceipt: imageUrl
            });

            await newDonation.save();
            res.status(201).json({ status: true, newDonation });
        }
        catch (error) {
            res.status(400).json({ message: 'Donation not created' });
        }
    }
    async getAllDonations(req, res) {
        try {
            const donations = await Donation.find();
            res.status(200).json(donations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getDonationById(req, res) {
        try {
            const donation = await Donation.findById(req.params.id);
            if (!donation) {
                return res.status(404).json({ message: 'Donation not found' });
            }
            res.status(200).json(donation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DonationController();
module.exports.upload = upload;
