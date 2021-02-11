const mongoose = require("mongoose");
const { User } = require("../models/user");

module.exports.upvote = async function (req, res) {
  const content = await mongoose.connection.db
    .collection(req.body.contentType)
    .findOne({ _id: new mongoose.Types.ObjectId(req.body.id) });
  if (!content) return res.status(404).send("Error! content not found.");

  const user = await User.findOne({
    _id: req.user._id,
    upvoted: { id: req.body.id, contentType: req.body.contentType },
  });
  if (user) return res.status(200).send("upvote successfull!");

  const userRes = await User.updateOne(
    { _id: req.user._id },
    {
      $addToSet: {
        upvoted: { id: req.body.id, contentType: req.body.contentType },
      },
    }
  );

  const contentRes = await mongoose.connection.db
    .collection(req.body.contentType)
    .updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $inc: { votes: 1 } }
    );

  //TODO:Possible data incosistency here, not to mention two awaits will run sequentially
  if (!userRes.n || !contentRes.result.n)
    return res.status(500).send("upvote failed.");
  return res.status(200).send("upvote successfull!");
};

module.exports.downvote = async function (req, res) {
  const content = await mongoose.connection.db
    .collection(req.body.contentType)
    .findOne({ _id: new mongoose.Types.ObjectId(req.body.id) });
  if (!content) return res.status(404).send("Error! content not found.");

  const user = await User.findOne({
    _id: req.user._id,
    upvoted: { id: req.body.id, contentType: req.body.contentType },
  });
  if (!user) return res.status(200).send("downvote successfull!");

  const userRes = await User.updateOne(
    { _id: req.user._id },
    {
      $pull: {
        upvoted: { id: req.body.id, contentType: req.body.contentType },
      },
    }
  );

  const contentRes = await mongoose.connection.db
    .collection(req.body.contentType)
    .updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.id) },
      { $inc: { votes: -1 } }
    );

  //TODO:Possible data incosistency here, not to mention two awaits will run sequentially
  if (!userRes.n || !contentRes.result.n)
    return res.status(500).send("downvote failed.");
  return res.status(200).send("downvote successfull!");
};
