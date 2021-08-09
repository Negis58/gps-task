const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// Маршрут эндпоинта для получения тестового токена
router.get('/login', authController.login);

module.exports = router;