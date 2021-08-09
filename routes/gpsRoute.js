const express = require('express');

const router = express.Router();

const gpsController = require('../controllers/gpsController');
const {check} = require("express-validator");

// Маршруты конечных эндпоинтов

// Маршрут для получения списка координат пользователя
router.get('/:user_id', [
    check('user_id').isInt(),
   check('firstDate').optional().isString(),
   check('lastDate').optional().isString()
], gpsController.getGpsCord);

// Маршрут для создания координат пользователя
router.post('/', [
    check('gps_coordinates').isString()
], gpsController.createGpsCord);

module.exports = router;