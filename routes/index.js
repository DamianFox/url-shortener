var express = require('express');
var router = express.Router();

var ctrlUrls = require('../controllers/url.controllers.js');

// Todo routes
router
  .route('/new')
  .post(ctrlUrls.urlAddOne);


module.exports = router;