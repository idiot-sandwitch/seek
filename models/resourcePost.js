const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const mongoose = require("mongoose");
require("mongoose-type-url");

//TODO: add schema and validation for branch, sem, subject as enum
//TODO: implement uploading content files
//TODO: Do url checking
const resourePostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    editorChoice: {
      type: Boolean,
      default: false,
    },
    contentUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const ResourcePost = mongoose.model("ResourcePost", resourePostSchema);
function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    content: Joi.string().min(1).required(),
    authorId: Joi.objectId().required(),
    subject: Joi.objectId().required(),
    course: Joi.objectId(),
    editorChoice: Joi.boolean(),
    contentUrl: Joi.string().min(3).max(255),
  });

  return schema.validate(post);
}

function pickData(post) {
  return _.pick(post, [
    "title",
    "content",
    "authorId",
    "subject",
    "course",
    "editorChoice",
    "contentUrl",
  ]);
}

exports.ResourcePost = ResourcePost;
exports.validateResourcePost = validatePost;
exports.pickResourcePostData = pickData;
