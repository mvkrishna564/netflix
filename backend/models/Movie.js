const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String },          // thumbnail
    imgTitle: { type: String },     // large title image
    imgSm: { type: String },        // small thumbnail
    trailer: { type: String },      // trailer URL
    video: { type: String },        // full video URL
    year: { type: String },
    limit: { type: Number },        // age limit
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    duration: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
