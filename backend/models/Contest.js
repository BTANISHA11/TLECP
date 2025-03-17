// backend/models/Contest.js
const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  startTime: { type: Date, required: true },
  duration: { type: String, required: true },
  youtubeLink: { type: String, default: '' }, // Optional field for YouTube link
});

module.exports = mongoose.model('Contest', contestSchema);