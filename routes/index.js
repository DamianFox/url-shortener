var express = require('express');
var router = express.Router();

// Todo routes
router
  .route('/new')
  .get(function(req, res) {
	res.render('index');
  });


module.exports = router;