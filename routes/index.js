var express = require('express');
var router = express.Router();

var ctrlUrls = require('../controllers/url.controllers.js');

// Url routes
router
  .route('/new')
  .post(ctrlUrls.urlAddOne);

router
  .route('/urls/:urlId')
  .get(ctrlUrls.urlGetOne)


module.exports = router;