const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity").default;
const mongoose = require("mongoose");
const _ = require("lodash");
const { ResourcePost } = require("./resourcePost");

//NOTE: remember to update anonymous user in config.js after updating schema
//TODO: implement branch, sem
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  avatar: {
    type: String,
    default: `${process.env.BASE_URL}avatars/default_avatar.jpg`,
    required: true,
  },
  upvoted: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      contentType: {
        type: String,
        enum: [ResourcePost.collection.collectionName],
        required: true,
      },
    },
  ],
  //TODO: Set anonymous users' isVerified to true when creating them so as to make them be able to login.
  isVerified: {
    type: Boolean,
    default: false,
    required: false
  }
  //TODO: implement public profile link stuff
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_PRIVATE_KEY
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  //complexity options work as flags.
  //use requirementCount to set how many of these requirements must be fulfilled.
  const complexityOptions = {
    min: 4,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
  };
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: passwordComplexity(complexityOptions).required(),
    avatar: Joi.string(),
  });

  return schema.validate(user);
}

function validateEditUser(userData) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    avatar: Joi.string().required(),
  });

  return schema.validate(userData);
}

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}

function pickData(userData) {
  return _.pick(userData, ["name", "email", "password"]);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateEditUser = validateEditUser;
exports.pickUserData = pickData;
exports.validateLogin = validateLogin;
