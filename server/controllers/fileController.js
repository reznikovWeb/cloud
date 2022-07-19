const fileService = require('../services/fileService');
const User = require('../models/User');
const File = require('../models/File')

class fileController {
    async createDir(req, res) {
        try {
            // Получаем название,тип и родительскую папку
            const {name, type, parent} = req.body;
            const file = new File({name, type, parent, user: user.id})

            // Находим родительский файл
            const parentFile = await File.findOne({_id: parent})

            // Если родительский файл не был найден, то добавляем в корневую директорию
            if (!parentFile) {
                file.path = name;
                await fileService.createDir(file)
            } else {
                // Если родительский был найден, то к корневому добвляем имя
                file.path = `${parentFile.path}/${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
}

module.exports = new fileController();