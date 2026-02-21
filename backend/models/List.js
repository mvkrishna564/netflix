const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String },       // 'movie' or 'series'
    genre: { type: String },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('List', listSchema);
