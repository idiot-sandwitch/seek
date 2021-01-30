const auth = require('../middleware/auth');  //here auth is authorization not authentication
const uploadAvatar = require('../middleware/uploadAvatar');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User, validateUser, validateData} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(['_id', 'name', 'email', 'avatar']);
    res.send(user);
});

router.post('/add', async (req, res) => {
    //TODO: allow only @vitbhopal.ac.in by adding this domain at end of string before validation
    //TODO: check if email given is correct by sending mail verification before signing in. we dont immediatley sign in after register req unlike mosh
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/edit', [auth, uploadAvatar.single('avatar')], async (req, res) => {
    //TODO:delete previous avatar image from the system unless it is default
    //TODO:delete avatar and set it to default
    if (req.file) req.body.avatar = `${process.env.BASE_URL}images/${req.file.filename}`;
    else req.body.avatar = req.user.avatar

    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await User.updateOne({_id: req.user._id}, {
        $set: {
            name: req.body.name,
            avatar: req.body.avatar
        }
    });
    if(result.ok === 1) res.status(200).send('Your profile has been successfully updated. ');
    else res.status(500).send("Error! please, try again later...");
})

module.exports = router;