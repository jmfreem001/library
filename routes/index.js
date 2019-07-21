var express = require('express');
var path = require('path');
var library = require(path.join(__dirname, '..', 'public/javascripts/main.js'))
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Library', myLibrary: library });
});

module.exports = router;
