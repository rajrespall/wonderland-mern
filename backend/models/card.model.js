const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
}, 
  gameDate: { 
    type: Date, 
    required: true, 
    default: Date.now 
},
  failed: { 
    type: Number, 
    required: true 
},
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Normal', 'Hard'],  
  },
  completed: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
});

module.exports = mongoose.model('Card', cardSchema, 'wondercards');