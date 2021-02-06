require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');
//enable this to make winston keep the process runnning after logging the error/exception.
//Advised not to(for debugging).
winston.exitOnError = true;
module.exports = function (winston) {
    winston.add(
        new winston.transports.Console({ format: winston.format.combine(winston.format.simple(), winston.format.colorize()), level: 'info' })
    );
    winston.add(
        new winston.transports.File({ filename: './log-files/error_logs', level: 'error' })
    );
    winston.add(
        new winston.transports.File({ filename: './log-files/info_logs', level: 'info' })
    );
    winston.add(
        new winston.transports.MongoDB({ db: "mongodb://localhost/DSC-errors", options: { useUnifiedTopology: true } }, level = 'error')
    );
    winston.add(
        new winston.transports.File({ filename: './log-files/uncaughtExceptions.log', level: 'error', handleExceptions: true })
    );
    winston.add(
        new winston.transports.Console({ format: winston.format.combine(winston.format.simple(), winston.format.colorize()), level: 'error', handleExceptions: true })
    );
}