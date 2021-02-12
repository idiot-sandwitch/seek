if (process.env.NODE_ENV) {
  require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
  });
} else {
  require("dotenv").config();
}
const { User } = require("./models/user");

if (process.env.NODE_ENV) console.log(`ENV: ${NODE_ENV}`);

const anon = new User({
  name: "Anonymous",
  email: "Null",
  password: "Null",
  avatar: `${process.env.BASE_URL}avatars/anonymous.jpg`,
  isVerified: true,
});

const enVars = [
  "JWT_PRIVATE_KEY",
  "BASE_URL",
  "MAX_AVATAR_SIZE_MB",
  "JWT_HEADER",
];

module.exports.createAnonymousUser = async function () {
  const user = await User.findOne({ email: "Null" });
  if (user) console.log("Anonymous user already exists.");
  else {
    anon.save().catch((err) => {
      console.log(err);
      process.exit(1);
    });
    console.log("Anonymous user created.");
  }
};
module.exports.anonymousId = async function () {
  const user = await User.findOne({ email: "Null" });
  if (!user) {
    console.error("Could not find anonymous user");
    process.exit(1);
  }
  return user.id;
};

module.exports.checkEnvVars = function () {
  enVars.forEach((val) => {
    if (!process.env[val]) {
      console.error(`FATAL ERROR! ${val} not defined`);
      process.exit(1);
    }
  });
};
