const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const mongoose = require("mongoose");

const resetPassSchema = new mongoose.Schema({
  otp: {
    type: String,
    length: 8,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    expires: "30m",
    default: Date.now,
  },
});

const ResetPassOTP = mongoose.model("reset-pass-otp", resetPassSchema);

function validatePassReset(req) {
  const schema = Joi.object({
    otp: Joi.string().length(8).required(),
  });
  return schema.validate(req);
}

exports.ResetPassOTP = ResetPassOTP;
exports.validatePassReset = validatePassReset;
