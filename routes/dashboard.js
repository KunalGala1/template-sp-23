/* Import Required Modules */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

/* Import Models */
const User = require('../models/User');

/* Import Auth Configs */
const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('admin/dashboard', {
    name: req.user.username,
  });
});

module.exports = router;
