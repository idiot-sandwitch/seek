const Joi = require("joi");
const mongoose = require("mongoose");

const branchSchema = mongoose.Schema({
  branch: {
    type: String,
    required: true,
    unique: true,
  },
  semester: {
    type: String,
    required: true,
  },
  courses: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Course"
  }]
});
