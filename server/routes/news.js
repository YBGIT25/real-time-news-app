const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Route to get trending news (grouped by category)
router.get('/trending', async (req, res) => {
  try {
    const trending = await News.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json(trending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to post a new news item
router.post('/', async (req, res) => {
  try {
    const news = await News.create(req.body); // Insert news into MongoDB
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
