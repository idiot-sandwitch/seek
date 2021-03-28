const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const { Comment } = require("./comment");
Joi.ObjectId = require("joi-objectid")(Joi);

const replyToModelTypes = [Comment.collection.collectionName, "subcomments"];
const subCommentSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replyToId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "replyToModel",
      required: true,
    },
    replyToModel: {
      type: String,
      required: true,
      enum: replyToModelTypes,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    content: {
      type: String,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: "subcomments" }
);

const SubComment = mongoose.model("SubComment", subCommentSchema);

function validate(subComment) {
  const schema = Joi.object({
    authorId: Joi.ObjectId().required(),
    replyToId: Joi.ObjectId().required(),
    replyToModel: Joi.string()
      .valid(...replyToModelTypes)
      .required(),
    commentId: Joi.ObjectId(),
    content: Joi.string().min(1).max(255),
  });

  return schema.validate(subComment);
}

function pickData(subComment) {
  return _.pick(subComment, [
    "authorId",
    "replyToId",
    "replyToModel",
    "commentId",
    "content",
  ]);
}

module.exports.SubComment = SubComment;
module.exports.validateSubComment = validate;
module.exports.pickSubCommentData = pickData;
