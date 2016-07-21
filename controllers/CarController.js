var CarModel = require('../models/CarModel.js');


module.exports = {

  list: function (req, res) {
    CarModel.find(function (err, cars) {
      return res.json(cars);
    });
  },

  show: function (req, res) {
    var id = req.params.id;
    CarModel.findOne({_id: id}, function (err, car) {
      return res.json(car);
    });
  },

  create: function (req, res) {
    var car = new CarModel({
        make : req.body.make,
        year : req.body.year,
        color : req.body.color,
        mileage : req.body.mileage
    });

    car.save(function (err, car) {
      return res.json(car);
    });
  },

  update: function (req, res) {
    var id = req.params.id;
    CarModel.findOne({_id: id}, function (err, car) {
      car.make = req.body.make ? req.body.make : car.make;
      car.year = req.body.year ? req.body.year : car.year;
      car.mileage = req.body.mileage ? req.body.mileage : car.mileage;
      car.color = req.body.color ? req.body.color : car.color;

      car.save(function (err, car) {
        return res.json(car);
      });
    });
  },

  remove: function (req, res) {
    var id = req.params.id;
    CarModel.findByIdAndRemove(id, function (err, car) {
      return res.json(car);
    });
  }
};
