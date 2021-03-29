const express = require("express");
const route = express.Router();
const { Course, validateCourse, pickCourseData } = require("../models/course");
const auth = require("../middlewares/auth");

//retrive
route.get("/all", auth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ code: 1 });
    res.status(200).send(courses);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("No courses found!");
  }
});

route.get("/find/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).send(course);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("No course found!");
  }
});

//Create
route.post("/add", auth, async (req, res) => {
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const exists = await Course.findOne({ code: req.body.code });
  if (exists) return res.status(400).send("Course already exists.");

  const course = new Course(pickCourseData(req.body));

  try {
    const resCor = await course.save();
    res.status(200).send(resCor);
  } catch (e) {
    console.log(e);
    res.status(500).send("Course creation failed");
  }
});

//update
route.put("/edit/:id", auth, async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      pickCourseData(req.body)
    );
    res.status(200).send(`${course.code} updated to ${req.body.code}`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Failed to update course");
  }
});

//delete

module.exports = route;
