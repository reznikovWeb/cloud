const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const corsMiddleware = require("./middleware/cors.middleware")
require('dotenv').config()

const app = express();

// Промежуточные функции
app.use(corsMiddleware)
app.use(express.json());

// Подключаем роуты
app.use("/api/auth", authRouter);
app.use("/api/file", fileRouter);
// Получаем порт на котором будет работать сервер
const PORT = process.env.PORT;

// Запускаем сервер и подключаемся к базе данных
// Подключение к базе данных - асинхронное, поэтому функция асинхронная
const start = async () => {

  try {
    await mongoose.connect(process.env.DB_URL);

    app.listen(PORT, () => {
      console.log("server is opened", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
