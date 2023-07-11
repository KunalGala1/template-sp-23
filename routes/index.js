const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('client/index');
});

router.get('/about', async (req, res) => {
  res.render('client/about');
});

router.get('/events', async (req, res) => {
  res.render('client/events');
});

router.get('/contact', async (req, res) => {
  res.render('client/contact');
});

module.exports = router;
