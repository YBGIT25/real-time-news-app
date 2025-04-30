const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

NewsSchema.index({ category: 1, createdAt: -1 }); // Index for performance on category and date

module.exports = mongoose.model('News', NewsSchema);
