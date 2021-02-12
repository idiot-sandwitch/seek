const Joi = require("joi");
const { pick } = require("lodash");
const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  code: {
    type: String,
    length: 7,
    required: true,
    unique: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

const valSchema = Joi.object({
  code: Joi.string().length(7).required(),
});

function validate(course) {
  return valSchema.validate(course);
}

function pickData(course) {
  return _.pick(course, ["code"]);
}

exports.Course = Course;
exports.validateCourse = validate;
exports.picCourseData = pickData;
