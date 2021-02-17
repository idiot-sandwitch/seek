const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity").default;
const mongoose = require("mongoose");
const _ = require("lodash");
const { ResourcePost } = require("./resourcePost");
const { string } = require("joi");

//NOTE: remember to update anonymous user in startup/config.js after updating schema
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
    minlength: 7,
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
    required: false,
  },
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

function validateData(data) {
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
    name: Joi.string().min(4).max(50),
    email: Joi.string().min(7).max(255).email(),
    password: passwordComplexity(complexityOptions),
    avatar: Joi.string(),
  });

  return schema.validate(data);
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    password: Joi.required(),
  });

  if (schema.validate(user).error) return schema.validate(user);
  return validateData(user);
}

function validateEditUser(userData) {
  const schema = Joi.object({
    name: Joi.required(),
    avatar: Joi.required(),
  });

  if (schema.validate(userData).error) return schema.validate(userData);
  return validateData(userData);
}

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.required(),
    password: Joi.string().min(4).max(1024).required(),
  });

  if (schema.validate(req).error) return schema.validate(req);
  return validateData(_.omit(req, ["password"]));
}

function validatePassReset(req) {
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
    old_password: Joi.string().required(),
    new_password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(req);
}

function validateForgotPass(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(req);
}

function validateSetNewPass(req) {
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
    otp: Joi.string().length(8).required(),
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(req);
}

function pickData(userData) {
  return _.pick(userData, ["name", "email", "password"]);
}

exports.User = User;
exports.validateData = validateData; //this is exported only for tests, no other use
exports.validateUser = validateUser;
exports.validateEditUser = validateEditUser;
exports.pickUserData = pickData;
exports.validateLogin = validateLogin;
exports.validatePassReset = validatePassReset;
exports.validateForgotPass = validateForgotPass;
exports.validateSetNewPass = validateSetNewPass;
