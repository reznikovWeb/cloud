const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const app = express();
const corsMiddleware = require("./middleware/cors.middleware")



app.use(corsMiddleware)
app.use(express.json());
app.use("/api/auth", authRouter);
// Получаем порт на котором будет работать сервер
const PORT = config.get("serverPort");
// Запускаем сервер и подключаемся к базе данных
// Подключение к базе данных - асинхронное, поэтому функция асинхронная
const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, () => {
      console.log("server is opened", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
