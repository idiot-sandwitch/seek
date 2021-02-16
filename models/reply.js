const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const mongoose = require("mongoose");
const { ResourcePost } = require("./resourcePost");

// NOTE: here, 'of' means reply of or reply to
const ofTypes = [ResourcePost.collection.collectionName, "replies"];
const ofSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  contentType: {
    type: String,
    enum: ofTypes,
    required: true,
  },
});

const replySchema = new mongoose.Schema(
  {
    of: ofSchema,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true, collection: "replies" }
);

const Reply = mongoose.model("Reply", replySchema);
function validate(reply) {
  const ofSchema = Joi.object({
    id: Joi.objectId().required(),
    contentType: Joi.string()
      .valid(...ofTypes)
      .required(),
  });
  const schema = Joi.object({
    of: Joi.object().required(),
    authorId: Joi.objectId().required(),
    content: Joi.string().min(1).required(),
  });

  const result = {
    replySchema: schema.validate(reply),
    ofSchema: ofSchema.validate(reply.of),
  };
  if (result.ofSchema.error) result.error = result.ofSchema.error;
  if (result.replySchema.error) result.error = result.replySchema.error;

  return result;
}

function pickData(reply) {
  reply = _.pick(reply, ["of", "authorId", "content"]);
  reply.of = _.pick(reply.of, ["id", "contentType"]);
  return reply;
}

exports.Reply = Reply;
exports.validateReply = validate;
exports.pickReplyData = pickData;
