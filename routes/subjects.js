const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const {
  Subject,
  validateSubject,
  pickSubjectData,
} = require("../models/subject");

route.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.send(subjects);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("No subjects found!");
  }
});

route.get("/subject/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.send(subject);
  } catch (e) {
    console.log(e.message);
    res.status(404).send("Subject not found!");
  }
});

route.put("/subject/:id/edit", async (req, res) => {
  const { error } = validateSubject(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  try {
    const subject = Subject.findByIdAndUpdate(
      req.params.id,
      pickSubjectData(req.body)
    );
  } catch (e) {
    res.status(500).send("Edit operation failed");
  }
});

route.post("/add", async (req, res) => {
  const { error } = validateSubject(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const subject = new Subject(pickSubjectData(req.body));
  try {
    subject.save();
    res.status(200).send(`${subject.name} added successfully`);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});
