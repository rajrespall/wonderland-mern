const mongoose = require("mongoose");

const puzSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: false
    },
    timeSpent: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    playedAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    autoIndex: false // disable auto-indexing
});
// Ensure no indexes are created automatically
puzSchema.set('autoIndex', false);

const Puz = mongoose.model('Puz', puzSchema, 'wonderpuz');

// Explicitly remove any existing indexes
Puz.collection.dropIndexes().catch(err => {
    console.log('No indexes to drop or already dropped');
});

module.exports = Puz;