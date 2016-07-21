var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
  'make' : String,
  'year' : {type: Number, max: 2016},
  'color' : String,
  'mileage' : String
});

module.exports = mongoose.model('CarModel', carSchema);
