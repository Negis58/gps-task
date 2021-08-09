const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');


// Создаем модель данных для работы с координатами пользователя
const UsersGps = sequelize.define('users_gps', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    gps_coordinates: {type: DataTypes.GEOMETRY('POINT', 4326), allowNull: false},
    date: {type: DataTypes.DATE, defaultValue: Date.now()}
}, {timestamps: false});

module.exports = {UsersGps}