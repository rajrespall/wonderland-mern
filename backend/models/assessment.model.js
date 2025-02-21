// models/assess.model.js
const mongoose = require("mongoose");

const assessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    communication: {
        type: [Number],  // Update to an array of numbers
        required: true
    },
    emotional: {
        type: [Number],  // Update to an array of numbers
        required: true
    },
    routine: {
        type: [Number],  // Update to an array of numbers
        required: true
    },
    sensory: {
        type: [Number],  // Update to an array of numbers
        required: true
    },
    social: {
        type: [Number],  // Update to an array of numbers
        required: true
    },
    others: {
        type: [String],  // Update to an array of strings
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Assessment", assessSchema);
