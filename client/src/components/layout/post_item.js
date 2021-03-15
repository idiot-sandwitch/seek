import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";

export const PostItem = ({
  post: {
    title,
    content,
    type,
    authorId,
    url,
    votes,
    comments,
    editorChoice,
    code,
    subject,
  },
}) => {
  const showEditorBadge = (isChoice) => {
    if (isChoice) {
      return (
        <Button className="badgeButton">
          <Badge
            style={{
              borderColor: "gold",
              color: "gold",
            }}
          >
            <i style={{ marginRight: "10px" }} class="fas fa-star"></i>
            Editor's Choice
          </Badge>
        </Button>
      );
    } else return null;
  };

  return (
    <Container style={{ width: "80rem", padding: "1rem" }}>
      <Row
        style={{
          backgroundColor: "#383838",
          color: "white",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        <Media>
          <span
            style={{
              marginBottom: "auto",
              marginTop: "auto",
              fontSize: "3em",
              padding: "1em",
            }}
          >
            <i class="fas fa-file-alt"></i>
          </span>
        </Media>
        <Media.Body style={{ padding: "1em" }}>
          <span>{subject}</span>
          <h1
            style={{
              marginBottom: "-0.7rem",
              marginTop: "-0.6rem",
              padding: "0px",
            }}
          >
            {title}
          </h1>
          <span style={{ fontWeight: "lighter" }}>@{authorId}</span>
          <p style={{ marginTop: "1rem", margin: "0px", fontSize: "1.5rem" }}>
            {content}
          </p>
          <span>
            <i class="fas fa-link" style={{ marginRight: "10px" }} />
            <a href={url}>URL</a>
          </span>
        </Media.Body>
      </Row>
      <Row
        style={{
          backgroundColor: "#292929",
          color: "white",
          padding: "0.6em",
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
      >
        <span style={{ marginRight: "1.5em", fontWeight: "bold" }}>
          <Button className="iconButton">
            <i class="fas fa-arrow-up" />
          </Button>
          {votes}
          <Button className="iconButton">
            <i class="fas fa-arrow-down" />
          </Button>
        </span>
        <span style={{ marginRight: "1.5em", fontWeight: "bold" }}>
          <Button className="iconButton">
            <i class="fas fa-comment-dots" />
          </Button>
          {comments.length}
        </span>
        <span>
          <Button className="iconButton">
            <i class="fas fa-share"></i>
          </Button>
        </span>

        <span className="ml-auto mr-3">
          {showEditorBadge(editorChoice)}
          <Button className="badgeButton">
            <Badge>SUBCODE</Badge>
          </Button>
        </span>
      </Row>
    </Container>
  );
};
