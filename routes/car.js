// routes/car.js
const express = require('express');
const { createCar, getCars, getCarById, updateCar, deleteCar, searchCar, searchCars } = require('../controllers/carcontoller');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createCar);
router.get('/cars',auth, getCars);
router.get('/:id', auth, getCarById);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);
router.get('/search',auth,  searchCars)

module.exports = router;
