const mongoose = require("mongoose");

const assessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    communication: {
        type: Number,  
        required: true
    },
    emotional: {
        type: Number,  
        required: true
    },
    routine: {
        type: Number,  
        required: true
    },
    sensory: {
        type: Number,  
        required: true
    },
    social: {
        type: Number,  
        required: true
    },
    others: {
        type: String,  
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Assessment", assessSchema);
