### Тестовое приложение для получения и добавления gps-координат пользователей

Для работы с координатами используется PostGIS
### Запуск сервера
1) npm start

### Запуск БД в Docker

1) docker run --name=gps-task -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p 5436:5432 -d --rm postgis/postgis

### Запросы

1) Получаем jwt-token по эндпоинту GET 'localhost:PORT/auth/login'
2) Получение координат пользователя GET 'localhost:PORT/gps/user_id?firstDate=VALUE&lastDate=VALUE
3) Создание добавление координат пользователя POST 'localhost:8080/gps/' в body передаем "gps_coordinates": "lat,lon", где lan - широта, а lon - долгота