import React from "react";

import { useForm } from "react-hook-form";
import { Typeahead } from "react-bootstrap-typeahead";

import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";

export const CreatePost = () => {
  const { register, handleSubmit, reset, getValues } = useForm();

  const subjects = ["Machine Learning", "Meth Chemistry", "C++ Programming"];
  const courses = ["MAT1003", "ECE3001", "PHY1001"];

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

  return (
    <Container style={{ marginTop: "5rem" }}>
      <Container className="seekPostCard">
        <h1 style={{ fontWeight: "bolder" }}>CREATE A NEW POST</h1>
        <Form
          style={{ marginLeft: "0px", marginRight: "0px" }}
          className="seekForm"
          as="form"
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
