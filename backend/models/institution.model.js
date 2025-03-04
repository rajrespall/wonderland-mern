const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mapEmbed: {
    type: String
  }
});

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution; 