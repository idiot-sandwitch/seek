const express = require("express");
const { Branch, validateBranch, pickBranchData } = require("../models/branch");
const { areCourseIdsValid } = require("../models/course");
const auth = require("../middlewares/auth");
const route = express.Router();

//create

route.post("/add", auth, async (req, res) => {
  const { error } = validateBranch(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  if (!areCourseIdsValid(req.body.courses)) {
    res.status(400).send("Invalid course id(s)");
  }
  //const branch = new Branch( pickBranchData(req.body)); //for some reason not picking courses array

  const branch = new Branch({
    branch: req.body.branch,
    semester: req.body.semester,
    courses: req.body.courses,
  });
  try {
    await branch.save();
    res.status(200).send(branch);
  } catch (e) {
    console.log(e);
    res.status(500).send("Branch creation failed");
  }
});

//retrive
route.get("/all", auth, async (req, res) => {
  try {
    const branches = await Branch.find().sort({ branch: 1 });
    res.status(200).send(branches);
  } catch (e) {
    console.log(e);
    res.status(500).send("No branch found");
  }
});

route.get("/find/:id", auth, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    res.status(200).send(branch);
  } catch (e) {
    console.log(e);
    res.status(500).send("Branch not found");
  }
});

//update

route.put("/edit/:id", auth, async (req, res) => {
  //if client only wants to edit some properties, they'll still have to send all properties for validation to work
  const { error } = validateBranch(pickBranchData(req.body));
  if (error) {
    console.log(error);
    res.status(400).send("Invalid propertioes");
  }

  //ISSUE: if branch/semester are not in request body then updated to NULL
  //SOLVED: put req.body itself isntead of picking elements from req.body
  try {
    const branch = await Branch.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).send(`${branch.branch} updated sucessfully`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Branch update failed");
  }
});

route.put("/addCourse/:id", auth, async (req, res) => {
  if (!areCourseIdsValid(req.body.courses)) {
    res.status(400).send("Invalid course id(s)");
  }

  try {
    const branch = await Branch.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          courses: { $each: req.body.courses },
        },
      }
    );
    res.status(200).send(`${branch.branch} updated sucessfully`);
  } catch (e) {
    console.log(e);
    res.status(500).send("Branch update failed");
  }
});

//delete

//deleteCourses Route handler
module.exports = route;
