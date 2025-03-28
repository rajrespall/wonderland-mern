const express = require("express");
const {createDonation, getAllDonations, getDonationById, createAnonymousDonation, upload} = require("../controllers/donation.controller");
const verifyAdminToken = require('../middleware/admin.auth.middleware');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, upload.single('donationReceipt'), createDonation);
router.post('/anonymous', upload.single('donationReceipt'), createAnonymousDonation);
router.get('/', verifyAdminToken, getAllDonations);
router.get('/:id', getDonationById);

module.exports = router;