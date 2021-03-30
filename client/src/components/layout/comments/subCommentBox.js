import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import axios from "../../../features/axiosSetup";

import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";

const SubCommentBox = ({ commentId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { data } = useSelector((state) => state.post);

  const { _id } = data;

  const onPost = async (data) => {
    data["replyToId"] = commentId;
    data["commentId"] = commentId;
    await axios({
      method: "POST",
      url: "api/comments/comment",
      data: JSON.stringify({
        replyToId: data.replyToId,
        content: data.content,
        commentId: data.commentId,
      }),
      headers: { "x-auth-token": localStorage.getItem(`token`) },
    });
  };

  return (
    <Container style={{ width: "100%" }}>
      <Form as="form" onSubmit={handleSubmit(onPost)}>
        <Form.Control
          style={{
            height: "10rem",
            resize: "none",
          }}
          maxLength="500"
          className="seekInput"
          name="content"
          ref={register}
          placeholder="Add a subcomment"
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

export default SubCommentBox;
