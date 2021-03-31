const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const anonymous = require("../middlewares/anonymous");
const router = require("express").Router();
const vote = require("../middlewares/vote");
const _ = require("lodash");
const { Comment } = require("../models/comment");
const {
  SubComment,
  validateSubComment,
  pickSubCommentData,
} = require("../models/subComment");

router.post("/comment", [auth, anonymous], async (req, res) => {
  req.body.replyToModel = "SubComment";
  req.body = pickSubCommentData(req.body);

  const { error } = validateSubComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.commentId === req.body.replyToId)
    return res.status(404).send("Comment not found!");
  const comment = await Comment.findById(req.body.commentId);
  if (!comment) return res.status(404).send("Comment not found!");

  const replyToModel = await SubComment.findById(req.body.replyToId);
  if (!replyToModel) return res.status(404).send("Comment not found!");

  let subComment = new SubComment(req.body);
  try {
    await subComment.save();
    await Comment.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.commentId) },
      { $addToSet: { subComments: subComment._id } }
    );
    res.status(200).send({ id: subComment._id });
  } catch (e) {
    res.status(500).send("Failed to comment!");
    console.error(e);
  }
});

router.get("/find/:id", async (req, res) => {
  const populateSubCommentArr = [
    {
      path: "authorId",
      select: "name avatar",
    },
    {
      path: "replyToId",
      populate: {
        path: "authorId",
        select: "name",
      },
      select: "authorId",
    },
  ];
  const subComment = await SubComment.findById(req.params.id).populate(
    req.query.populated !== undefined ? populateSubCommentArr : ""
  );
  if (!subComment) return res.status(404).send("SubComment not found!");
  return res.status(200).send(subComment);
});

router.put(
  "/upvote",
  auth,
  (req, res, next) => {
    req.body = _.pick(req.body, ["id"]);
    req.body.contentType = SubComment.collection.collectionName;

    next();
  },
  vote.upvote
);

router.put(
  "/downvote",
  auth,
  (req, res, next) => {
    req.body = _.pick(req.body, ["id"]);
    req.body.contentType = SubComment.collection.collectionName;

    next();
  },
  vote.downvote
);

module.exports = router;
