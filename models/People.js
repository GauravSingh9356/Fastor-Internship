const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, 'Email already registered'],
  },
  role: {
    type: String,
    enum: {
      values: ['Councellor', 'Employee'],
      message: 'It can be either Councellor or Employee',
    },
  },
  enquiries: [
    {
      enquiry: { type: mongoose.Schema.ObjectId, ref: 'Student' },
    },
  ],
});

module.exports = mongoose.model('People', peopleSchema);
