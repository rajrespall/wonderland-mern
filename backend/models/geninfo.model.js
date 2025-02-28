const mongoose = require("mongoose");

const generalInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    childName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    diagnosisYear: {
        type: Number,
        required: true
    },
    diagnosisAge: {
        type: Number,
        required: true
    },
    isTestData: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("GeneralInfo", generalInfoSchema);