const Router = require("express");
const User = require("../models/User");
const router = new Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// POST запрос по URL - /registration
router.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      // Проверка ошибок валидатора
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }

      // Получаем email и password с тела запроса
      const { email, password } = req.body;

      // Проверяем существует ли такой User в базе данных
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }

      // Если такого пользователя нет, то можем добавлять пользователя в базу данных
      const hashPassword = await bcrypt.hash(password, 8); // hash password
      const user = new User({ email, password: hashPassword }); // Запишем данные в нашу модель
      await user.save(); // сохраняем юзера в базу данных

      // Возвращаем ответ от сервера
      return res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      // Отправляем ошибку в логи
      res.send({ message: "Server error" });
    }
  }
);

// POST запрос по URL - /login
router.post(
  "/login",

  async (req, res) => {
    try {
      // Получаем email и password с тела запроса
      const { email, password } = req.body;

      // Проверяем есть ли такой пользователь на сервере
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Если пользователь найден, то сравниваем пароль в запросе с тем
      // Что лежит на сервере
      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // Если и пароли совпали, тогда генерируем токен
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      // Возвращаем данные на клиент
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.log(e);
      // Отправляем ошибку в логи
      res.send({ message: "Server error" });
    }
  }
);

module.exports = router;
