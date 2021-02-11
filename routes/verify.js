const express = require('express');
const router = express();
const { User } = require('../models/user');
const { VerificationToken, validateVerification} = require('../models/verification');
const mongoose = require('mongoose');

router.post('/', async (req, res)=>{
    const { error } = validateVerification(req.body);
    if (error) return res.status(400).send(`Invalid request: ${error.details[0].message}`);

    const verificationToken = await VerificationToken.findOne({token: req.body.token});
    if(!verificationToken) return res.status(401).send('Invalid/expired token.');

    const user = await User.findByIdAndUpdate(verificationToken.user, {isVerified: true}, {new: true});
    if(!user) return res.status(404).send('Invalid token, the user does not exist.');

    await VerificationToken.find().deleteOne(verificationToken);
    res.status(200).send('User successfully verified! you may now login');
})


module.exports = router;