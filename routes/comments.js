const express = require("express");
const route = express.Router();

const {
  Comment,
  validateComment,
  validateSubComment,
  pickCommentData,
  pickSubCommentData,
  validateEditComment,
} = require("../models/comment");

//create
route.post("/add", async (req, res) => {
  const { error } = validateComment(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
  }

  const comment = new Comment(pickCommentData(req.body));
  //TODO: add comment ID to resource post comments array

  try {
    await comment.save();
    res.status(200).send({ comment });
  } catch (e) {
    console.log(e);
    req.status(500).send("Comment failed");
  }
});

route.post("/addSubComment/:id", async (req, res) => {
  const { error } = validateSubComment(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
  }

  const comment = await Comment.findOne({ _id: req.params.id });
  comment.replies.push(pickSubCommentData(req.body));
  try {
    await comment.save();
    res.status(200).send({ comment });
  } catch (e) {
    conslole.log(e);
    req.status(500).send("Comment Reply failed");
  }
});

//retrive
route.get("/all", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).send(comments);
  } catch (e) {
    conslole.log(e);
    req.status(500).send("Retrieval failed");
  }
});

route.get("/find/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    res.status(200).send(comment);
  } catch (e) {
    conslole.log(e);
    req.status(500).send("Comment not found");
  }
});

//update
route.put("/edit/:id", async (req, res) => {
  const { error } = validateComment(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
  }

  try {
    await Comment.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).send(`Comment updated Successfully`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Update failed");
  }
});

route.put("/editSubComment/:id/:subId", async (req, res) => {
  const { error } = validateSubComment(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
  }

  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    const subComment = await comment.replies.id(req.params.subId);
    subComment.content = req.body.content;

    await comment.save();
    res.status(200).send("Reply updated");
  } catch (e) {
    console.log(e);
    res.status(500).send("Update failed");
  }
});

//delete

module.exports = route;
