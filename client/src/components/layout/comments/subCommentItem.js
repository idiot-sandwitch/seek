import React from "react";
import Container from "react-bootstrap/esm/Container";
import { HashLink as Link } from "react-router-hash-link";
import Button from "react-bootstrap/esm/Button";

export const SubCommentItem = ({
  subComment: { authorId, replyToId, content, votes },
}) => {
  const getCommentAuthor = (commentId) => {
    //FIXME: return comment's author name
    return commentId;
  };

  return (
    <Container
      className="seekSubComment"
      style={{ marginTop: "1vw !important" }}
    >
      <span style={{ whiteSpace: "nowrap" }}>
        <h5 style={{ display: "inline-block" }}>{authorId}</h5>{" "}
        <Link smooth to="/teachers#pappuId">
          @{getCommentAuthor(replyToId)}
        </Link>
      </span>
      <p>{content}</p>
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
      </span>
    </Container>
  );
};
