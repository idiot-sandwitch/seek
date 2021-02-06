const winston = require('winston');
const config = require('./config.js');

//Create and initialize app.
const express = require('express');
const app = express();


//Include the startup routes.
require('./startup/logging')(winston);
require('./startup/routes')(app);
require('./startup/validation')();


config.checkEnvVars();
require('./startup/db')();
config.createAnonymousUser();

//Get port variable from the env, default is 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));