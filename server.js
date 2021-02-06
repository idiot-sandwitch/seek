const config = require('./config.js');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const replies = require('./routes/replies');
const resourcePosts = require('./routes/resourcePosts');
const express = require('express');
const app = express();

config.checkEnvVars();
mongoose.connect('mongodb://localhost/DSC')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

config.createAnonymousUser();

app.use(express.json());
app.use(express.static('public'));
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/resourceposts', resourcePosts);
app.use('/api/reply', replies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));