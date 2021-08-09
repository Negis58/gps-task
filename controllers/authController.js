const jwt = require("jsonwebtoken");


// Тестовый класс необходимый для проверки работоспособности добавления GPS-координат в БД
// А также ограничения получения gps-координат других пользователей
class AuthController {
    async login(req, res) {
        try {
            // Создаем тестовый токен для авторизации, в который добавляем id пользователя
            // id пользователя необходимо для создания gps-координат, а также для ограничения доступа
            // к эндпоинтам создания и получения координат
            const token = jwt.sign({userId: '1'}, process.env.JWT_SECRET, {expiresIn: '1d'});
            res.status(200).json({token});

        } catch (error) {
            res.status(500).json('Something went wrong, please try again')
        }
    }
}

module.exports = new AuthController();