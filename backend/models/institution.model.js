const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mapEmbed: {
    type: String,
    required: true
  },
  institutionImage: {
    type: String,
    required: true,
    default: ''
  },
});

const Institution = mongoose.model('Institution', institutionSchema);
module.exports = Institution; 