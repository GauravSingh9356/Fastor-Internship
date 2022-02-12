const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, 'Email already registered'],
  },
  courseInterested: String,
  isAssigned: {
    type: Boolean,
    default: false,
  },
  lead: {
    type: mongoose.Schema.ObjectId,
    ref: 'People',
  },
});

module.exports = mongoose.model('Student', studentSchema);
