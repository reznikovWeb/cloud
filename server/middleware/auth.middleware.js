const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        // Забираем token из get запроса
        const token = req.headers.authorization.split('')[1];
        // Проверяем есть ли token
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }

        // Получаем зашифрованные данные
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Добавим данные из токена в req
        req.user = decoded;
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }

}