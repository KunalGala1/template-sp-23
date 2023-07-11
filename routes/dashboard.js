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
  res.render('admin/dashboard');
});

router.get('/events', ensureAuthenticated, (req, res) => {
  res.render('admin/events');
});

router.get('/about', ensureAuthenticated, (req, res) => {
  res.render('admin/about');
});

module.exports = router;
