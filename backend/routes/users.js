const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// @route GET /api/users - Get all users (admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const { new: isNew } = req.query;
    let users;
    if (isNew) {
      users = await User.find().sort({ createdAt: -1 }).limit(5).select('-password');
    } else {
      users = await User.find().select('-password');
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/users/stats - Get user stats (admin)
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $project: { month: { $month: '$createdAt' } },
      },
      {
        $group: { _id: '$month', total: { $sum: 1 } },
      },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PUT /api/users/:id - Update user
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Don't allow password update through this route
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/users/:id - Delete user
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
