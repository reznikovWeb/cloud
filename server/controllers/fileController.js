const fileService = require("../services/fileService");
const User = require("../models/User");
const File = require("../models/File");
const fs = require("fs");

class fileController {
  async createDir(req, res) {
    try {
      // Получаем название,тип и родительскую папку
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });

      // Находим родительский файл
      const parentFile = await File.findOne({ _id: parent });

      // Если родительский файл не был найден, то добавляем в корневую директорию
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);
        parentFile.child.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get files" });
    }
  }

  async uploadFile(req, res) {
    try {
      //Получаем название файла
      const file = req.files.file;

      // Получаем папку в которой находимся
      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      });

      // Находим пользователя
      const user = await User.findOne({ _id: req.user.id });

      // Проверка на свободное место у Юзера - если нет места на диске
      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: "There no space on the disk" });
      }

      // Если место все-таки есть
      user.usedSpace = user.usedSpace + file.size;

      // Работа с сервером ------------------------------------------------------------------
      // Здесь уже работа с файлами на сервере
      let path;
      if (parent) {
        path = `${process.env.FILE_PATH}\\${user._id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${process.env.FILE_PATH}\\${user._id}\\${file.name}`;
      }

      // Проверяем существует ли такой файл(название) по такому пути
      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "There no space on the disk" });
      }
      // Переносим файл по нашему пути
      file.mv(path);

      // Что сохраняем уже в базе данных -----------------------------------------------------
      // Получаем тип файла
      const type = file.name.split(".").pop();
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: user._id,
      });
      // сохраняем данные в БД
      await dbFile.save();
      await user.save();

      res.json(dbFile);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Upload error" });
    }
  }
}

module.exports = new fileController();
