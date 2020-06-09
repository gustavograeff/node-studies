const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  // res.send('<h1>Hello from Express</h1>');
  // res.send({ user: 'Gustavo' });
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
