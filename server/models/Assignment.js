const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  dueDate: { type: Date, required: true }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
