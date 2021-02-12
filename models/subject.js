const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

function validate(subject) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(subject);
}

function pickData(subject) {
  return _.pick(subject, ["name"]);
}

exports.Subject = Subject;
exports.validateSubject = validate;
exports.pickSubjectData = pickData;
