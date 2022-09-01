const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      delete req.user.dataValues.password;
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
