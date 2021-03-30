import React from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import axios from "../../../features/axiosSetup";

import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";

const CommentBox = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data } = useSelector((state) => state.post);

  const { _id } = data;

  const onPost = async (data) => {
    data["postId"] = _id;
    console.log(data);

    await axios({
      method: "POST",
      url: "api/resourceposts/comment",
      data: JSON.stringify({ postId: data.postId, content: data.content }),
      headers: { "x-auth-token": localStorage.getItem(`token`) },
    });
  };

  const onDiscard = () => {
    console.log("discard");
  };

  return (
    <Container style={{ marginTop: "2rem", width: "100%" }}>
      <Form as="form" onSubmit={handleSubmit(onPost)}>
        <h3>Add Comment</h3>
        <Form.Control
          style={{
            height: "10rem",
            resize: "none",
          }}
          maxLength="500"
          className="seekInput"
          name="content"
          ref={register}
          placeholder="Add a comment"
          as="textarea"
        ></Form.Control>
        <Row
          style={{
            justifyContent: "space-between",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <Button type="submit" style={{ width: "30%" }} className="seekButton">
            Submit
          </Button>
          <Button
            type="reset"
            style={{ width: "30%" }}
            className="logoutButton"
          >
            Discard
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default CommentBox;
