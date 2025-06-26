const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },  // Link blog to user by email
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true },  // e.g., Travel, Food, Business
  createdAt: { type: Date, default: Date.now },
  author: { type: String, required: true } // Add author field
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
