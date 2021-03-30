const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
Joi.ObjectId = require("joi-objectid")(Joi);

const commentSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //send postId as well from front end, middleWare require it
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
    subComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubComment",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

function validate(comment) {
  const schema = Joi.object({
    authorId: Joi.ObjectId(),
    content: Joi.string().min(1).max(255),
  });

  return schema.validate(comment);
}

function pickData(comment) {
  return _.pick(comment, ["authorId", "content"]);
}

module.exports.Comment = Comment;
module.exports.validateComment = validate;
module.exports.pickCommentData = pickData;
