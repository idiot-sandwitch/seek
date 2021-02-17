const { invalid } = require("joi");
const Joi = require("joi");
const _ = require("lodash");
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

async function areIdsValid(courses) {
  const invalidCourseIds = [];

  for (Id in courses) {
    let course = await Course.findOne({ _id: Id });
    if (!course) {
      invalidCourseIds.push(Id);
    }
  }

  if (invalidCourseIds.length > 0) {
    console.log(`Courses: ${invalidCourseIds} do not exist`);
    return false;
  } else {
    return true;
  }
}

exports.Course = Course;
exports.validateCourse = validate;
exports.pickCourseData = pickData;
exports.areCourseIdsValid = areIdsValid;
