const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const donationSchema = new mongoose.Schema({
    donator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
        autopopulate: true
    },
    category: {
        type: String,
        require: true
    },
    // donationAmount: {x
    //     type: String,
    //     required: true
    // },
    // paymentMethod: {
    //     type: String,
    //     required: true
    // },
    donationReceipt: {
        type: String,
        default: '',
        require: true
    }
},
  { timestamps: true }
);

donationSchema.plugin(autopopulate);
const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation; 