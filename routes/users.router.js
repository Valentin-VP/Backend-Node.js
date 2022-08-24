const express = require('express');

const router = express.Router();
// /api/users

// define the home page users
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('limit and offset are required');
  }
});

module.exports = router;
