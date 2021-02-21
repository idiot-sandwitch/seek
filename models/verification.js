const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const mongoose = require("mongoose");

//TODO: If the token is hashed, its length might need to be extended as per the salt.
const verificationSchema = new mongoose.Schema({
  token: {
    type: String,
    length: 128,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    expires: "3d",
    default: Date.now,
  },
});

const VerificationToken = mongoose.model(
  "verification-token",
  verificationSchema
);

function validateVerification(req) {
  const schema = Joi.object({
    token: Joi.string().length(128).required(),
  });
  return schema.validate(req);
}

exports.VerificationToken = VerificationToken;
exports.validateVerification = validateVerification;
