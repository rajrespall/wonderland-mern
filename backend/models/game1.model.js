const mongoose = require("mongoose");

const game1Schema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    gameDate: {
        type: Date,
        default: Date.now
    },
    attempts: {
        type: Number,
        required: true
    },
    matches: {
        type: Number,
        required: true
    },
    timeTaken: {
        type: Number, 
        required: true
    }
}, {
    timestamps: true
});

const Game1 = mongoose.model("Game1", game1Schema);

module.exports = Game1;