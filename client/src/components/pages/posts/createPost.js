import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "../../../features/axiosSetup";

import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";

export const CreatePost = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const { register, handleSubmit, reset, getValues } = useForm();
  //TODO: Make redux states for these arrays

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");

  const [subObjs, setSubObjs] = useState([]);
  const [corObjs, setCorObjs] = useState([]);

  const [formData, setFormData] = useState({});

  const checkDuplicateSubjects = () => {
    //TODO: use getValues to see if subject field's text is already present
    //       if yes return false, else returen true
    return true;
  };

  const checkDuplicateCourse = () => {
    //TODO: use getValues to see if course field's text is already present
    //       if yes return false, else returen true
    return true;
  };

  const onSubmit = (data) => {
    data["subject"] = subject;
    data["course"] = course;
    console.log("formData:", data);
    setFormData(data);
    //if data subject, course not in arrays, add them to database
    //do axios request to add the a resourcePost
  };

  const handleSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleCourse = (event) => {
    setCourse(event.target.value);
  };

  const isSubjectPresent = (value) => {
    return value === subject;
  };

  const isCoursePresent = (value) => {
    return value === course;
  };
  const isInitialRender = useRef(true); //is true if it is the initial render of components

  //fetch subjects and courses from the backend
  useEffect(async () => {
    let newCourses = [];
    let newSubjects = [];

    const resCourse = await axios({
      method: "GET",
      url: "api/courses/all",
      headers: { "x-auth-token": localStorage.getItem(`token`) },
    });

    resCourse.data.forEach((item) => {
      newCourses = [...newCourses, item.code];
    });

    const resSubject = await axios({
      method: "GET",
      url: "api/subjects/all",
      headers: { "x-auth-token": localStorage.getItem(`token`) },
    });

    resSubject.data.forEach((item) => {
      newSubjects = [...newSubjects, item.name];
    });

    setCorObjs([...resCourse.data]);
    setSubObjs([...resSubject.data]);

    setCourses(newCourses);
    setSubjects(newSubjects);
  }, []);

  //   //does a post request to the backend upon form submition
  //   content: "adadaw"
  // course: "new CODE"
  // subject: "C++ Programming"
  // title: "New post 2"
  // url: "https://www.youtube.com/watch?v=

  useEffect(async () => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      const data = {
        title: formData.title,
        content: formData.content,
        url: formData.url,
        replies: [],
        editorChoice: false,
      };

      //check subject
      if (subject !== "" && subjects.find(isSubjectPresent) !== undefined) {
        const sub = subObjs.find((element) => element.name === subject);
        data["subject"] = sub._id;
      } else {
        //axios call to add subject
        const resSubject = await axios({
          method: "POST",
          contentUrl: "api/subjects/add",
          headers: { "x-auth-token": localStorage.getItem(`token`) },
          data: JSON.stringify({ name: subject }),
        });
        data["subject"] = resSubject.data._id;
      }

      //check course
      if (course !== "" && courses.find(isCoursePresent) !== undefined) {
        const cor = corObjs.find((element) => element.code === course);
        data["course"] = cor._id;
      } else {
        //axios call to add course
        const resCourse = await axios({
          method: "POST",
          url: "api/courses/add",
          headers: { "x-auth-token": localStorage.getItem(`token`) },
          data: JSON.stringify({ code: course }),
        });
        data["course"] = resCourse.data._id;
        console.log("DATA AFTER COURSE:", data);
      }

      data["authorId"] = user._id;

      console.log("DATE BEFORE POST:", data);
      
      await axios({
        method: "POST",
        url: "api/resourceposts/add",
        headers: { "x-auth-token": localStorage.getItem(`token`) },
        data: JSON.stringify({
          title: data.title,
          content: data.content,
          course: data.course,
          subject: data.subject,
          contentUrl: data.contentUrl,
          authorId: data.authorId,
          replies: data.replies,
          editorChoice: data.editorChoice,
        }),
      });
      console.log("FINAL DATA: ", data);
      //     // strint   id      id       string  string  id        id       bool
      //     // content, course, subject, title,  contentUrl,    authorId, replies, editorChoice;
      //     console.log("formData:", JSON.stringify(formData));
    }
    // const postRes = await axios({
    //   method:"POST",
    //   url: "/api/resourcePosts/add",
    //   headers: {"x-auth-token" : localStorage.getItem(`token`)},
    //   data:
    // })
  }, [formData]);

  return (
    <Container style={{ marginTop: "5rem" }}>
      <Container className="seekPostCard">
        <h1 style={{ fontWeight: "bolder" }}>CREATE A NEW POST</h1>
        <Form
          style={{ marginLeft: "0px", marginRight: "0px" }}
          className="seekForm"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="seekInput"
              name="title"
              ref={register}
              type="text"
              placeholder="Enter the post title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="seekInput"
              name="content"
              ref={register}
              as="textarea"
              placeholder="Describe your post a little"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Subject</Form.Label>
              <Typeahead
                positionFixed
                allowNew={checkDuplicateSubjects}
                id="subject"
                options={subjects}
                name="subject"
                placeholder="Select a subject"
                onBlur={handleSubject}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Course Code</Form.Label>
              <Typeahead
                positionFixed
                allowNew={checkDuplicateCourse}
                id="course"
                options={courses}
                name="course"
                placeholder="Select a subject"
                inputProps={{ ref: { register } }}
                onBlur={handleCourse}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>
              <i className="fas fa-link" /> {"  "} URL
            </Form.Label>
            <Form.Control
              className="seekInput"
              name="url"
              ref={register}
              placeholder="Enter the link to the resourse"
            />
          </Form.Group>

          <Button className="seekButton" type="submit">
            CREATE POST
          </Button>
        </Form>

        {/* title: Joi.string().min(3).max(150).required(),
    content: Joi.string().min(1).required(),
    authorId: Joi.objectId().required(),
    replies: Joi.objectId(),
    subject: Joi.objectId().required(),
    course: Joi.objectId(),
    editorChoice: Joi.boolean(),
    contentUrl: Joi.string().min(3).max(255), */}
      </Container>
    </Container>
  );
};
