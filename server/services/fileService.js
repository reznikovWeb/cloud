const fs = require("fs");
const File = require("../models/File");

class FileService {
  // Функция по созданию папок
  createDir(file) {
    // Путь к файлам
    const filePath = `${process.env.FILE_PATH}/${file.user}/${file.path}`;

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
