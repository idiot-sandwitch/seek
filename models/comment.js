const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
Joi.ObjectId = require("joi-objectid")(Joi);

const subCommentSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  replyToId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  votes: Number,
});

const commentSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ResourcePost",
    required: true,
  },
  content: { type: String, required: true },
  votes: Number,
  replies: [subCommentSchema],
});

const valSubCommentSchema = Joi.object({
  authorId: Joi.ObjectId(),
  replyToId: Joi.ObjectId(),
  content: Joi.string().min(1).max(255).required(),
  votes: Joi.number(),
});

const valcommentSchema = Joi.object({
  authorId: Joi.ObjectId(),
  postId: Joi.ObjectId(),
  content: Joi.string().min(1).max(255),
  votes: Joi.number(),
  replies: Joi.array().items(valSubCommentSchema),
});

const Comment = mongoose.model("Comment", commentSchema);
function validate(comment) {
  return valcommentSchema.validate(comment);
}

function valSubComment(subComment) {
  return valSubCommentSchema.validate(subComment);
}

function validateEdit(comment) {
  const editSchema = Joi.object({
    content: Joi.string().min(1).max(255).required(),
  });

  return editSchema.validate(comment);
}

function pickData(comment) {
  return _.pick(comment, ["authorId", "postId", "content", "replies"]);
}

function pickSubCommData(subComment) {
  return _.pick(subComment, ["authorId", "replyToId", "content"]);
}

module.exports.Comment = Comment;
module.exports.validateComment = validate;
module.exports.validateSubComment = valSubComment;
module.exports.validateEditComment = validateEdit;
module.exports.pickCommentData = pickData;
module.exports.pickSubCommentData = pickSubCommData;
