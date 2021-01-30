const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

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
        default: (process.env.BASE_URL + 'images/default_avatar.jpg'),
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id : this._id}, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
