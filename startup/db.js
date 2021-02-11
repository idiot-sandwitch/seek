const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/DSC", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => winston.info("Connected to DSC Mongo-DB Database."));
};
