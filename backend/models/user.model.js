const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    generalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralInfo'
    },
    hasCompletedAssessment: {
        type: Boolean,
        default: false
    },
    isTestData: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationOTP: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);