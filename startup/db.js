const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  const db = process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : "";
  mongoose
    .connect(`${process.env.MONGODB_CONNECTION_STRING}/Seek${db}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`Connected to Seek${db} MongoDB Database.`));
};
