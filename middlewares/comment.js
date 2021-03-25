const mongoose = require("mongoose");
const {
  Comment,
  pickCommentData,
  validateComment,
} = require("../models/comment");
module.exports = async function (req, res) {
  const { error } = validateComment(pickCommentData(req.body));
  if (error) return res.status(400).send(error.details[0].message);

  const post = await mongoose.connection.db
    .collection(req.body.contentType)
    .findOne({ _id: new mongoose.Types.ObjectId(req.body.postId) });
  if (!post) return res.status(404).send("Error! post not found");

  let comment = new Comment(pickCommentData(req.body));
  try {
    await comment.save();
    await mongoose.connection.db
      .collection(req.body.contentType)
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.postId) },
        { $addToSet: { comments: { id: comment._id } } }
      );
    res.status(200).send({ id: comment.id });
  } catch (e) {
    res.status(500).send("Failed to comment!");
    console.error(e);
  }
};
