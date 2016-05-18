var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
  'make' : String,
  'year' : {type: Number, max: 2016}
});

module.exports = mongoose.model('CarModel', carSchema);
