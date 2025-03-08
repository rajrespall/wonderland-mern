const express = require("express");
const {createDonation, getAllDonations, getDonationById, upload} = require("../controllers/donation.controller");
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, upload.single('donationReceipt'), createDonation);
router.get('/', verifyToken, getAllDonations);
router.get('/:id', getDonationById);

module.exports = router;