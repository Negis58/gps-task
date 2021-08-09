const jwt = require('jsonwebtoken');


// Функция промежуточной обработки
// Функция проверяет авторизирован пользователь или нет
// Для авторизации используется JWT токены
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Получаем заголовок авторизации
        // и вынимаем сам токен
        if (!token) {
            res.status(401).json('Unauthorized');
        }

        // Если токен существует, то проверяем его на подлинности и добавляем его в req.user
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();

    } catch (e) {
        res.status(401).json('Unauthorized');
    }
}
