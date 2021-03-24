import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { HashLink as Link } from "react-router-hash-link";
import { SubComments } from "./subComments";

export const Comment_item = ({
  comment: { authorId, postId, content, votes, subComments },
}) => {
  return (
    <Container>
      <Row id="pappuId" className="seekComment">
        <Container>
          {" "}
          <h5>{authorId}</h5> <p>{content}</p>
          <span>
            <Button className="iconButton">
              <i className="fas fa-arrow-up" />
            </Button>
            {votes}
            <Button className="iconButton">
              <i className="fas fa-arrow-down" />
            </Button>
            <span />
            <span style={{ marginRight: "1.5em", fontWeight: "bold" }}></span>
            <Button className="iconButton">
              <i className="fas fa-comment-dots" />
            </Button>
            {subComments.length}
          </span>
        </Container>
      </Row>
      <Row className="seekSubCommentBox">
        <SubComments subComments={subComments} />
      </Row>
    </Container>
  );
};
