const auth = require("../middlewares/auth");
const anonymous = require("../middlewares/anonymous");
const router = require("express").Router();
const vote = require("../middlewares/vote");
const _ = require("lodash");
const {
  ResourcePost,
  validateResourcePost,
  pickResourcePostData,
} = require("../models/resourcePost");
const { User } = require("../models/user");

router.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const post = await ResourcePost.findById(id);
  if (!post) res.status(404).send("Post not found!");
  else res.status(200).send(post);
});

//TODO: implement this after updating schema and validation
// router.get('/posts/:branch/:sem/:subject', async (req, res) => {
//     const { branch, sem, subject } = req.params;
//     const posts = await ResourcePost.find()
// });

//TODO: remove this after above get request is working
router.get("/posts", async (req, res) => {
  try {
    const posts = await ResourcePost.find();
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(404).send("No posts found!");
  }
});

router.post("/add", [auth, anonymous], async (req, res) => {
  const { error } = validateResourcePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new ResourcePost(pickResourcePostData(req.body));
  try {
    await post.save();
    res.status(200).send({ id: post.id });
  } catch (error) {
    res.status(500).send("Failed creating post, try again later...");
    console.error(error);
  }
});

router.put(
  "/upvote",
  auth,
  (req, res, next) => {
    req.body = _.pick(req.body, ["id"]);
    req.body.contentType = ResourcePost.collection.collectionName;

    next();
  },
  vote.upvote
);

router.put(
  "/downvote",
  auth,
  (req, res, next) => {
    req.body = _.pick(req.body, ["id"]);
    req.body.contentType = ResourcePost.collection.collectionName;

    next();
  },
  vote.downvote
);

module.exports = router;
