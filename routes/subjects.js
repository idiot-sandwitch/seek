const express = require("express");
const route = express.Router();
const auth = require("../middlewares/auth");
const {
  Subject,
  validateSubject,
  pickSubjectData,
} = require("../models/subject");

route.get("/all", auth, async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.status(200).send(subjects);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("No subjects found!");
  }
});

route.get("/find/:id", auth, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.send(subject);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("Subject not found!");
  }
});

route.put("/edit/:id", auth, async (req, res) => {
  const { error } = validateSubject(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id },
      pickSubjectData(req.body)
    );
    res.status(200).send(`${subject.name} changed to ${req.body.name}`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Edit operation failed");
  }
});

route.post("/add", auth, async (req, res) => {
  const { error } = validateSubject(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const subject = new Subject(pickSubjectData(req.body));
  try {
    await subject.save();
    res.status(200).send(`${subject.name} added successfully`);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

module.exports = route;
