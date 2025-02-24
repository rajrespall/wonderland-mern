const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  timeSpent: {
    type: Number, 
    required: true
  },
  playedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Match', matchSchema, 'wondermatch');