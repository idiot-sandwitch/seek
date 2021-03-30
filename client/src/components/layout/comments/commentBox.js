import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushSingleComment } from "../../../features/post/postSlice";

import { useForm } from "react-hook-form";
import axios from "../../../features/axiosSetup";

import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";

const CommentBox = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { _id } = data;

  const onPost = async (data) => {
    data["postId"] = _id;
    console.log(data);

    const res = await axios({
      method: "POST",
      url: "api/resourceposts/comment",
      data: JSON.stringify({ postId: data.postId, content: data.content }),
      headers: { "x-auth-token": localStorage.getItem(`token`) },
    });

    if (res.status === 200) {
      const newComment = await axios({
        method: "GET",
        url: `/api/comments/find/${res.data.id}?populated`,
      });
      dispatch(pushSingleComment(newComment.data));
    }
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
          <Button style={{ width: "30%" }} className="logoutButton">
            Discard
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default CommentBox;
