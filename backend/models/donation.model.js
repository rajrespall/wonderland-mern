const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    donationAmount: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    donationReceipt: {
        type: String,
        default: ''
    }
},
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation; 