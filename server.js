//Create and initialize app.
const express = require("express");
const app = express();

//Setup logging and environment variables
const winston = require("winston");
const config = require("./startup/config");
config.checkEnvVars();
require("./startup/db")();
config.createAnonymousUser();

//Include the startup routes.
require("./startup/logging")(winston);
require("./startup/routes")(app);
require("./startup/validation")();

//Get port variable from the env, default is 3000.
const port = process.env.PORT || 3000;
module.exports = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);
