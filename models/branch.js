const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const _ = require("lodash")

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

const Branch = mongoose.model("Branch", branchSchema);

function validate(branch){
  const schema = Joi.object({
    branch: Joi.string().required().min(3).max(255),
    semester: Joi.string.min(1).max(8),
    courses: Joi.array().items(Joi.objectId());
  });
}

function pickData(branch){
  return _.pick(branch, [
    "branch", "sememster", "cousrses" 
  ]);
}

exposts.Branch = Branch;
exports.validateBranch = validate;
exports.pickBranchData = pickData;