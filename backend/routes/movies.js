const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { protect, admin } = require('../middleware/auth');

// @route GET /api/movies - Get all movies (admin) or random movie
router.get('/', async (req, res) => {
  try {
    const { type, genre } = req.query;
    let query = {};

    if (type === 'series') query.isSeries = true;
    else if (type === 'movie') query.isSeries = false;
    if (genre) query.genre = genre;

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/movies/random - Get random movie or series
router.get('/random', protect, async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type === 'series') query.isSeries = true;
    else if (type === 'movie') query.isSeries = false;

    const count = await Movie.countDocuments(query);
    const random = Math.floor(Math.random() * count);
    const movie = await Movie.findOne(query).skip(random);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/movies/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/movies - Create movie (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PUT /api/movies/:id - Update movie (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/movies/:id - Delete movie (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
