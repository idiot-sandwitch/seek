//Create and initialize app.
const express = require("express");
const app = express();

//Setup logging and environment variables
const config = require("./startup/config");
config.checkEnvVars();
require("./startup/db")();
const winston = require("winston");
require("./startup/logging")(winston);

config.createAnonymousUser();

//Include the startup routes.
require("./startup/routes")(app);
require("./startup/validation")();

//Get port variable from the env, default is 5000.
const port = process.env.PORT || 5000;
module.exports = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);
