var express = require('express');
var router = express.Router();

var ctrlUrls = require('../controllers/url.controllers.js');

// Url routes
router
  .route('/new')
  .post(ctrlUrls.urlAddOne);

router
  .route('/url/:urlId')
  .get(ctrlUrls.urlGetOne)
  .delete(ctrlUrls.urlDeleteOne);

router
  .route('/:num')
  .get(ctrlUrls.getOriginalUrl);


module.exports = router;