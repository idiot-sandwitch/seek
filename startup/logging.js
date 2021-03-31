require("express-async-errors");
require("winston-mongodb");
const winston = require("winston");

let silent;
switch (process.env.NODE_ENV) {
  case "test":
    silent = true;
    break;
  default:
    silent = false;
    break;
}

//enable this to make winston keep the process runnning after logging the error/exception.
//Advised not to(for debugging).
winston.exitOnError = true;
module.exports = function (winston) {
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      ),
      level: "info",
      silent: silent,
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "./log-files/error_logs",
      level: "error",
      silent: silent,
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "./log-files/info_logs",
      level: "info",
      silent: silent,
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: `${process.env.MONGODB_CONNECTION_STRING}/Seek-errors`,
      options: { useUnifiedTopology: true },
      level: "error",
      silent: silent,
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "./log-files/uncaughtExceptions.log",
      level: "error",
      handleExceptions: true,
      silent: silent,
    })
  );
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      ),
      level: "error",
      handleExceptions: true,
      silent: silent,
    })
  );
};
