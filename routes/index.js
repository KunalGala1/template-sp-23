const express = require('express');
const router = express.Router();

const pages = [{ path: '', name: 'index' }, { path: 'lessons' }, { path: 'about' }, { path: 'events' }, { path: 'contact' }];

pages.forEach(page => {
  router.get(`/${page.path}`, async (req, res) => {
    res.render(`client/${page.name || page.path}`);
  });
});

module.exports = router;
