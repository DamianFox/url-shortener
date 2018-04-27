var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: String,
    required: true
  },
},{
    versionKey: false
});

mongoose.model('Url', urlSchema);