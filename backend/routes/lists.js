const express = require('express');
const router = express.Router();
const List = require('../models/List');
const { protect, admin } = require('../middleware/auth');

// @route GET /api/lists - Get random lists
router.get('/', protect, async (req, res) => {
  try {
    const { type, genre } = req.query;
    let query = {};
    if (type) query.type = type;
    if (genre) query.genre = genre;

    const lists = await List.find(query).populate('content').limit(10);
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/lists - Create list (admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const list = await List.create(req.body);
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/lists/:id - Delete list (admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.json({ message: 'List deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
