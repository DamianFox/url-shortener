var mongoose = require('mongoose');
var Url = mongoose.model('Url');
var urlMod = require('url') ;

// POST a new Url
module.exports.urlAddOne = function(req, res) {
	console.log("POST new Url");

	var url = req.body.url;

  var num = Math.floor(100000 + Math.random() * 900000);

  var hostname = req.headers.host;

  if (validateURL(url)) {
		Url
		.create({
	  		original_url : url,
	  		short_url : hostname + "/" + num.toString().substring(0, 6)
		}, function(err, url) {
	  		if (err) {
		    	console.log("Error creating url");
		    	res
		      		.status(400)
		      		.json(err);
	  		} else {
	    		console.log("Short Url created!");
	    		res
	      			.status(201)
	      			.json(url);
	  		}
		});
	} else {
		urlObj = {
			"error": "No short url found for given input"
		};
		res
			.status(500)
  			.json(urlObj);
	}
};

// GET one specific Url by ID
module.exports.urlGetOne = function(req, res) {

	var id = req.params.urlId;

	Url
	.findById(id)
	.exec(function(err, doc) {
		console.log("doc", doc);
		var response = {
			status : 200,
			message : doc
		};
		if (err) {
			console.log("Error finding url");
			response.status = 500;
			response.message = err;
		} else if(!doc) {
			console.log("urlId not found in database", id);
			response.status = 404;
			response.message = {
		  		"message" : "url ID not found " + id
			};
		}
		res
		.status(response.status)
		.json(response.message);
	});
};

// DELETE one specific Url by ID
module.exports.urlDeleteOne = function(req, res) {
	var id = req.params.urlId;

	console.log('DELETE urlId', id);

	Url
	.findByIdAndRemove(id)
	.exec(function(err, doc) {
	  var response = {
	    status : 204,
	    message : doc
	  };
	  if (err) {
	    console.log("Error finding url");
	    response.status = 500;
	    response.message = err;
	  } else if(!doc) {
	    console.log("urlId not found in database", id);
	    response.status = 404;
	    response.message = {
	      "message" : "url ID not found " + id
	    };
	  }
	  res
	    .status(response.status)
	    .json(response.message);
	});
}

module.exports.getOriginalUrl = function(req, res) {
	var hostname = req.headers.host;
	if (req.params.num != 'favicon.ico') {
		var shortUrl = hostname + "/" + req.params.num;
		console.log("shortUrl", shortUrl);

		Url
		.findOne({
			"short_url": shortUrl
		}, function(err, url) {
      if (err) throw err;
      // object of the url
      if (url) {
        // we have a result
        console.log('Found ' + url);
        console.log('Redirecting to: ' + url.original_url);
        res.redirect(url.original_url);
      } else {
        // url not found
        res.send('Site not found');
      }
    });
	}

}

function validateURL(url) {
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
}