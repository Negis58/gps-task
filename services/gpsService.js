const {UsersGps} = require('../models/models');
const {Op} = require("sequelize");

class GpsService {
    // Функция для получения координат пользователя
    async getGpsCord(params, query) {
        const {user_id} = params; // id пользователя получаем из параметра
        const {firstDate, lastDate} = query; // Начальная и конечная дата из параметров
        let querySQL = {
            where: {}
        } // Создаем шаблон запроса
        if (user_id) {
            querySQL.where.user_id = user_id
        } // Добавляем в запрос id пользователя для поиска координат

        if (firstDate && lastDate) {
            querySQL.where.date = {
                [Op.between]: [firstDate, lastDate]
            }; // Если указаны начальная и конечная даты, то добавляем эти параметры в запрос для поиска координат
            // по заданному интервалу времени
        } else if (firstDate) {
            querySQL.where.date = {
                [Op.gte]: firstDate
            } // Т.к даты могут быть открытыми и пользователь указывает только начальную дату, то
            // выбираем интервал времени, который начинается с начальной даты и заканчивается самой поздней
            // датой по времени
        } else {
            querySQL.where.date = {
                [Op.lte]: lastDate
            } // Если пользователь указал только конечную даты, то выбираем интервал времени, который заканчивается
            // конечной датой
        }

        // Делаем запрос к БД
        const userGpsCord = await UsersGps.findAll(querySQL);
        const result = []; // Создаем пустой массив, в который будем добавлять координаты пользователя

        // Проходимся по выборке из БД и добавляем в результирующий массив gps-координату пользователя и дату
        // добавления этой координаты
        userGpsCord.forEach(item => {
            result.push({
                gps_coordinates: item.gps_coordinates.coordinates,
                date: item.date
            })
        })
        return result; // Возвращаем координаты пользователя

    }

    // Функция создания координаты пользователя
    async createGpsCord(user, body) {

        // GPS - координата определяется как широта и долгота
        // Предположим, что пользователь вводит координату в виде строки
        let gpsCord = body.gps_coordinates.split(','); // Разделяем координату на широту и долготу

        const gpsCoordinate = {
            latitude: gpsCord[0],
            longitude: gpsCord[1]
        } // Создаем объект в котором будет храниться ширина и долгота


        // Создаем точку, в которой будет находиться координата
        const point = {type: 'Point', coordinates: [gpsCoordinate.latitude, gpsCoordinate.longitude]}

        // Создаем запись в БД
        // В качестве значений передаем id пользователя (id пользователя будем получать из jwt-токена) и gps-координаты
        // Для работы с координатами будем использовать PostGIS, который добавляет поддержку географических объектов
        // в БД PostgreSQL
        const preResult = await UsersGps.create({user_id: user.userId, gps_coordinates: point});

        // Создаем объект ответа, в которой добавляем id пользователя, дату создания и gps-координату
        const result = {
            user_id: preResult.user_id,
            date: preResult.date,
            gps_coordinates: preResult.gps_coordinates.coordinates
        }
        return result; // Возвращаем созданную координату
    }
}

module.exports = new GpsService();