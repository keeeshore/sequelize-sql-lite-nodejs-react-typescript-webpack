const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('<p>HTML Data</p>');
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = router;
