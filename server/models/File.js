// Создаем сущность File
const { Schema, model, ObjectId } = require("mongoose");

const File = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },

  user: { type: ObjectId, ref: "User" },
  parent: { type: ObjectId, ref: "File" }, // Ссылается на папку в которой находится
  child: [{ type: ObjectId, ref: "File" }], // Ссылается на папки, которые находятся в нем
});

module.exports = model("File", File);
