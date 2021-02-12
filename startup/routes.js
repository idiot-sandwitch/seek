const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const replies = require("../routes/replies");
const resourcePosts = require("../routes/resourcePosts");
const error = require("../middlewares/error");
const subject = require("../routes/subjects");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/resourceposts", resourcePosts);
  app.use("/api/reply", replies);
  app.use("/api/subject", subject);
  app.use(error);
};
