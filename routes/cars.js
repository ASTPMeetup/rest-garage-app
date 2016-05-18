var express = require('express');
var router = express.Router();
var CarController = require('../controllers/CarController.js');

router.get('/', function (req, res) {
  CarController.list(req, res);
});

router.get('/:id', function (req, res) {
  CarController.show(req, res);
});

router.post('/', function (req, res) {
  CarController.create(req, res);
});

router.put('/:id', function (req, res) {
  CarController.update(req, res);
});

router.delete('/:id', function (req, res) {
  CarController.remove(req, res);
});

module.exports = router;
