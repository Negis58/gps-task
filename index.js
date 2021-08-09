require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const sequelize = require('./config/db');
const models = require('./models/models');
const gpsRouter = require('./routes/gpsRoute');
const authRouter = require('./routes/authRoute');
const authMiddleware = require('./middleware/authMiddleware');


// Создаем подключения к БД
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // Создает таблицы в БД, если они отсутствуют
        console.log('Connection has been established successfully');
    } catch (e) {
        console.error('Unable to connect to the database: ', e);
    }
})();



app.use(express.json());

app.use('/auth', authRouter); // Маршрут для получения тестового токена
app.use('/gps', authMiddleware, gpsRouter); // Маршрут для получения и создания координат, также добавляем
// функцию проверки авторизации пользователя

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port`);
})
