const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      delete req.user.dataValues.password;
      res.json({
        user: user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
