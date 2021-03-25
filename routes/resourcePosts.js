const auth = require("../middlewares/auth");
const anonymous = require("../middlewares/anonymous");
const router = require("express").Router();
const vote = require("../middlewares/vote");
const comment = require("../middlewares/comment");
const _ = require("lodash");

const {
  ResourcePost,
  validateResourcePost,
  pickResourcePostData,
} = require("../models/resourcePost");
const { User } = require("../models/user");
const { Subject } = require("../models/subject");
const { Course } = require("../models/course");

router.get("/find/:id", async (req, res) => {
  //TODO: Populate comments
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
router.get("/all", async (req, res) => {
  try {
    const posts = await ResourcePost.find()
      .populate("authorId", "name avatar")
      .populate("subject", "name");
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(404).send("No posts found!");
  }
});

router.get("/page/:page/:results", async (req, res) => {
  const { results, page } = req.params;

  try {
    const posts = await ResourcePost.find()
      .skip(page * results)
      .limit(parseInt(results))
      .populate("authorId", "name avatar")
      .populate("subject", "name");
    if (posts === []) {
      res.status(404).send("No posts found");
    }
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(404).send("No posts found!");
  }
});

router.get("/findByCourse/:course", async (req, res) => {
  try {
    const posts = await ResourcePost.find({ course: req.params.course })
      .populate("authorId", "name avatar")
      .populate("subject", "name");
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(404).send("No posts found!");
  }
});

router.get("/findBySubject/:subject", async (req, res) => {
  try {
    const posts = await ResourcePost.find({ subject: req.params.subject })
      .populate("authorId", "name avatar")
      .populate("subject", "name");
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(404).send("No posts found!");
  }
});

router.post("/add", [auth, anonymous], async (req, res) => {
  const { error } = validateResourcePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //TODO: Use promise.all here
  const user = await User.findById(req.body.authorId);
  if (!user) return res.status(404).send("User does not exist");

  const subject = await Subject.findById(req.body.subject);
  if (!subject) return res.status(404).send("Subject does not exist");

  //TODO: implement course
  // const course = await Course.findById(req.body.course);
  // if (!course) {
  //   res.status(404).send("Course does not exist");
  // }

  let post = new ResourcePost(pickResourcePostData(req.body));
  try {
    await post.save();
    return res.status(200).send({ id: post.id });
  } catch (error) {
    res.status(500).send("Failed creating post, try again later...");
    console.error(error);
  }
});

router.post(
  "/comment",
  auth,
  anonymous,
  (req, res, next) => {
    req.body.contentType = ResourcePost.collection.collectionName;
    next();
  },
  comment
);

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
