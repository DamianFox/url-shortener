var express = require('express');
var router = express.Router();

// Todo routes
router
  .route('/new')
  .get(function(req, res) {
	res.status(200)
		.json("/new route");
  });


module.exports = router;