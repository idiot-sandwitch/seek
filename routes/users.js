const auth = require('../middleware/auth');  //here auth is authorization not authentication
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(['_id', 'name', 'email', 'avatar']);
    res.send(user);
});

router.post('/', async (req, res) => {
    //TODO: allow only @vitbhopal.ac.in by adding this domain at end of string before validation
    //TODO: check if email given is correct by sending mail verification before signing in. we dont immediatley sign in after register req unlike mosh
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;