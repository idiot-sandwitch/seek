const mongoose = require("mongoose");
const { User } = require("../models/user");

module.exports.upvote = async function (req, res) {
  const content = await mongoose.connection.db
    .collection(req.body.contentType)
    .findOne({ _id: new mongoose.Types.ObjectId(req.body.id) });
  if (!content) return res.status(404).send("Error! content not found.");

  const alreadyUpvoted = await User.findOne({
    _id: req.user._id,
    upvoted: { id: req.body.id, contentType: req.body.contentType },
  });

  const alreadyDownvoted = await User.findOne({
    _id: req.user._id,
    downvoted: { id: req.body.id, contentType: req.body.contentType },
  });

  let userRes, contentRes;

  if (alreadyUpvoted) {
    userRes = await User.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          upvoted: { id: req.body.id, contentType: req.body.contentType },
        },
      }
    );
    contentRes = await mongoose.connection.db
      .collection(req.body.contentType)
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.id) },
        { $inc: { votes: -1 } }
      );
  } else if (alreadyDownvoted) {
    userRes = await User.updateOne(
      { _id: req.user._id },
      {
        $addToSet: {
          upvoted: { id: req.body.id, contentType: req.body.contentType },
        },
        $pull: {
          downvoted: { id: req.body.id, contentType: req.body.contentType },
        },
      }
    );

    contentRes = await mongoose.connection.db
      .collection(req.body.contentType)
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.id) },
        { $inc: { votes: 2 } }
      );
  } else {
    userRes = await User.updateOne(
      { _id: req.user._id },
      {
        $addToSet: {
          upvoted: { id: req.body.id, contentType: req.body.contentType },
        },
      }
    );

    contentRes = await mongoose.connection.db
      .collection(req.body.contentType)
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.id) },
        { $inc: { votes: 1 } }
      );
  }

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

  const alreadyDownvoted = await User.findOne({
    _id: req.user._id,
    downvoted: { id: req.body.id, contentType: req.body.contentType },
  });

  const alreadyUpvoted = await User.findOne({
    _id: req.user._id,
    upvoted: { id: req.body.id, contentType: req.body.contentType },
  });

  let userRes, contentRes;

  if (alreadyDownvoted) {
    userRes = await User.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          downvoted: { id: req.body.id, contentType: req.body.contentType },
        },
      }
    );

    contentRes = await mongoose.connection.db
      .collection(req.body.contentType)
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.id) },
        { $inc: { votes: 1 } }
      );
  } else if (alreadyUpvoted) {
    userRes = await User.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          upvoted: { id: req.body.id, contentType: req.body.contentType },
        },
        $addToSet: {
          downvoted: { id: req.body.id, contentType: req.body.contentType },
        },
      }
    );

    contentRes = await mongoose.connection.db
      .collection(req.body.contentType)
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.id) },
        { $inc: { votes: -2 } }
      );
  } else {
    userRes = await User.updateOne(
      { _id: req.user._id },
      {
        $addToSet: {
          downvoted: { id: req.body.id, contentType: req.body.contentType },
        },
      }
    );

    contentRes = await mongoose.connection.db
      .collection(req.body.contentType)
      .updateOne(
        { _id: new mongoose.Types.ObjectId(req.body.id) },
        { $inc: { votes: -1 } }
      );
  }

  //TODO:Possible data incosistency here, not to mention two awaits will run sequentially
  if (!userRes.n || !contentRes.result.n)
    return res.status(500).send("downvote failed.");
  return res.status(200).send("downvote successfull!");
};
