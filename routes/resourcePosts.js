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
const { Subject } = require("../models/subject");
const { Course } = require("../models/course");

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

router.get("/findByCourse/:course", async (req, res) => {
  try {
    const posts = await ResourcePost.find({ course: req.params.course });
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(404).send("No posts found!");
  }
});

router.get("/findBySubject/:subject", async (req, res) => {
  try {
    const posts = await ResourcePost.find({ subject: req.params.subject });
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(404).send("No posts found!");
  }
});

router.post("/add", [auth, anonymous], async (req, res) => {
  const { error } = validateResourcePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = User.findById(req.body.authorId);
  if (!user) {
    res.status(404).send("User does not exist");
  }

  const subject = Subject.findById(req.body.subject);
  if (!subject) {
    res.status(404).send("Subject does not exist");
  }

  const course = Course.findById(req.body.course);
  if (!course) {
    res.status(404).send("Course does not exist");
  }

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
