const express = require("express");
const route = express.Router();
const { Course, validateCourse, pickCourseData } = require("../models/course");

//retrive
route.get("/all", async (req, res) => {
  try {
    const courses = await Course.find().sort({ code: 1 });
    res.status(200).send(courses);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("No courses found!");
  }
});

route.get("/find/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).send(course);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("No course found!");
  }
});

//Create
route.post("/add", async (req, res) => {
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const course = new Course(pickCourseData(req.body));

  try {
    await course.save();
    res.status(200).send("Course created successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send("Course creation failed");
  }
});

//update
route.put("/edit/:id", async (req, res) => {});
//delete
