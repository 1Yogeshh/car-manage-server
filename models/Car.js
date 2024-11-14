// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  images:[{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Car', carSchema);
