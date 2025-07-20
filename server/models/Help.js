const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
  issue: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Help', helpSchema); 