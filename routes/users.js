const {VerificationToken} = require('../models/verification');
const randomString = require('randomstring');
const auth = require("../middlewares/auth"); //here auth is authorization not authentication
const uploadAvatar = require("../middlewares/uploadAvatar");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const {
  User,
  validateUser,
  validateEditUser,
  pickUserData,
} = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select([
    "_id",
    "name",
    "email",
    "avatar",
  ]);
  res.send(user);
});

//TODO: implement public profile link stuff

router.post("/add", async (req, res) => {
  //TODO: allow only @vitbhopal.ac.in by adding this domain at end of string before validation
  //TODO: check if email given is correct by sending mail verification before signing in. we dont immediatley sign in after register req unlike mosh
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(pickUserData(req.body));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //TODO: Hash this randomString before storing it in database.
  const userReference = {token: randomString.generate({length: 128}), user: user._id};
  const verificationToken = new VerificationToken(userReference);
  await verificationToken.save();

  await user.save();
  res.status(200).send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/edit", [auth, uploadAvatar.single("avatar")], async (req, res) => {
  //TODO:delete previous avatar image from the system unless it is default
  //TODO:delete avatar and set it to default
  //TODO:for now user can add an outside link to req.body.avatar and our validator can't catch it, change that
  if (req.file.db_url) req.body.avatar = req.file.db_url;
  else req.body.avatar = req.user.avatar;

  const { error } = validateEditUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        name: req.body.name,
        avatar: req.body.avatar,
      },
    }
  );
  if (result.n)
    res.status(200).send("Your profile has been successfully updated. ");
  else res.status(500).send("Error! please, try again later...");
});

module.exports = router;
