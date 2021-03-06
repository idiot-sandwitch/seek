if (process.env.NODE_ENV) {
  require("dotenv").config({
    path: `${__dirname}/../.env.${process.env.NODE_ENV}`,
  });
} else {
  require("dotenv").config();
}

const winston = require("winston");

if (process.env.NODE_ENV) winston.info(`NODE_ENV: ${process.env.NODE_ENV}`);

const { User } = require("../models/user");

const anon = new User({
  name: "Anonymous",
  email: "404NotFound",
  password: "Null",
  avatar: `${process.env.BASE_URL}avatars/anonymous.jpg`,
  isVerified: true,
});

const enVars = [
  "JWT_PRIVATE_KEY",
  "BASE_URL",
  "MAX_AVATAR_SIZE_MB",
  "JWT_HEADER",
  "SENDGRID_API_KEY",
];

module.exports.createAnonymousUser = async function () {
  const user = await User.findOne({ email: "404NotFound" });
  if (user) winston.info(`Anonymous user already exists with _id: ${user.id}.`);
  else {
    anon.save().catch((err) => {
      throw new Error(err.message, err);
    });
    winston.info(`Anonymous user created with _id: ${anon.id}`);
  }
};
module.exports.anonymousId = async function () {
  const user = await User.findOne({ email: "404NotFound" });
  if (!user) {
    throw new Error("Could not find anonymous user.");
  }
  return user.id;
};

module.exports.checkEnvVars = function () {
  enVars.forEach((val) => {
    if (!process.env[val]) {
      throw new Error(`FATAL ERROR! ${val} not defined`);
    }
  });
};
