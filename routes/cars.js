var express = require('express');
var router = express.Router();
var CarModel = require('../models/CarModel.js');

/*
* GET
*/
router.get('/', function (req, res) {
  CarModel.find(function (err, cars) {
    return res.json(cars);
  });
});

/*
* GET
*/
router.get('/:id', function (req, res) {
  var id = req.params.id;
  CarModel.findOne({_id: id}, function (err, car) {
    return res.json(car);
  });
});

/*
* POST
*/
router.post('/', function (req, res) {
  var car = new CarModel({
    make : req.body.make,
    year : req.body.year
  });

  car.save(function(err, car){
    return res.json(car);
  });
});

/*
* PUT
*/
router.put('/:id', function (req, res) {
  var id = req.params.id;
  CarModel.findOne({_id: id}, function (err, car) {
    car.make = req.body.make ? req.body.make : car.make;

    car.save(function (err, car) {
      return res.json(car);
    });
  });
});

/*
* DELETE
*/
router.delete('/:id', function (req, res) {
  var id = req.params.id;
  CarModel.findByIdAndRemove(id, function (err, car) {
    return res.json(car);
  });
});

module.exports = router;