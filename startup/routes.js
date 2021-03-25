const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const resourcePosts = require("../routes/resourcePosts");
const error = require("../middlewares/error");
const verify = require("../routes/verify");
const subject = require("../routes/subjects");
const course = require("../routes/courses");
const branch = require("../routes/branches");
const comments = require("../routes/comments");
const subComments = require("../routes/subComments");
const cors = require("cors");

//TODO: make it consistent
module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use(cors());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/verify", verify);
  app.use("/api/resourceposts", resourcePosts);
  app.use("/api/subject", subject);
  app.use("/api/course", course);
  app.use("/api/branch", branch);
  app.use("/api/comments", comments);
  app.use("/api/subcomments", subComments);
  app.use(error);
};
