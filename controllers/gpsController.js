const gpsService = require('../services/gpsService');
const {validationResult} = require("express-validator");

class GpsController {
    // Контроллер для получения координат пользователя
    async getGpsCord(req, res) {
        try {
            // Проверяем параметры на корректность, если переданы некорректные данные, то возвращаем пользователю
            // ответ с соотвествующей ошибкой
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({errors: errors.array()});
                return;
            }
            if (req.user.userId !== req.params.user_id) {
                res.status(403).json('Forbidden');
                return;
            }
            if (!req.query.firstDate && !req.query.lastDate) {
                res.status(400).json('Invalid data');
                return;
            }
            // Если входные параметры указаные верно, то вызываем сервис для получения координат пользователя
            const gpsCord = await gpsService.getGpsCord(req.params, req.query);
            res.status(200).json(gpsCord);
        } catch (error) {
            res.status(500).json('Something went wrong, please try again');
        }
    }

    async createGpsCord(req, res) {
        try {
            // Проверяем параметры на корректность, если переданы некорректные данные, то возвращаем пользователю
            // ответ с соотвествующей ошибкой
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({errors: errors.array()});
                return;
            }
            // Если входные данные указаные верно, то вызываем сервис для создания координат пользователя
            const createGpsCord = await gpsService.createGpsCord(req.user, req.body);
            res.status(201).json(createGpsCord);
        } catch (error) {
            res.status(500).json('Something went wrong, please try again');
        }
    }
}

module.exports = new GpsController();