const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const anonymous = require("../middlewares/anonymous");
const router = require("express").Router();
const { Reply, validateReply, pickReplyData } = require("../models/reply");

router.post("/", [auth, anonymous], async (req, res) => {
  const { error } = validateReply(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const content = await mongoose.connection.db
    .collection(req.body.of.contentType)
    .findOne({ _id: new mongoose.Types.ObjectId(req.body.of.id) });

  if (!content) return res.status(404).send("Error! content not found.");

  let reply = new Reply(pickReplyData(req.body));

  //can there be data inconsistency here? if Yes, then how to refactor this?
  try {
    await reply.save();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to reply, try again later...");
  }

  const result = await mongoose.connection.db
    .collection(req.body.of.contentType)
    .updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.of.id) },
      { $push: { replies: reply._id } }
    );

  if (result.result.n) return res.status(200).send({ id: reply.id });
  else return res.status(500).send("Failed to reply, try again later...");
});

module.exports = router;
