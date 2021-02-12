const mongoose = require("mongoose");
const Joi = require("joi");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

function validateSubject(subject) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        branch: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(subject);
}

exports.Subject = Subject;
exports.validate = validateSubject;
