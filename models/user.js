const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    avatar: {
        type: String,
        default: `${process.env.BASE_URL}images/default_avatar.jpg`,
        required: true
    },
    upvoted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'resourcePost'
    }]
    //TODO: implement public profile link stuff
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({
         _id : this._id,
         name: this.name,
         avatar: this.avatar
        }, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        avatar: Joi.string()
    });

    return schema.validate(user);
}

function validateEditUser(userData) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        avatar: Joi.string().required()
    });

    return schema.validate(userData);
}

function pickData(userData){
    return _.pick(userData, ['name', 'email', 'password']);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateEditUser = validateEditUser;
exports.pickUserData = pickData;
