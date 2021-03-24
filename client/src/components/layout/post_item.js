import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import Media from "react-bootstrap/esm/Media";
import Button from "react-bootstrap/esm/Button";

/* {
        "votes": 0,
        "replies": [],
        "editorChoice": false,
        "_id": "604f1f114ed25a4eb87c7c0c",
        "title": "Fake 3 NodeJS tutorial by mosh",
        "content": "Good course, very cool",
        "authorId": "602cd33c38c2747b15b7fefc",
        "subject": "6026c8b30bdf2031385d3da2",
        "course": "602d1c195fdcb95481d93412",
        "contentUrl": "fakeUrl",
        "createdAt": "2021-02-17T14:58:02.945Z",
        "updatedAt": "2021-02-17T14:58:02.945Z",
        "__v": 0
        "type":
    }*/

export const PostItem = ({
  post: {
    title,
    content,
    type,
    authorId,
    contentUrl,
    votes,
    replies,
    editorChoice,
    course,
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
            <i style={{ marginRight: "10px" }} className="fas fa-star"></i>
            Editor's Choice
          </Badge>
        </Button>
      );
    } else return null;
  };

  return (
    <Container style={{ width: "100%", padding: "1rem" }}>
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
            <i className="fas fa-file-alt"></i>
          </span>
        </Media>
        <Media.Body style={{ padding: "1em" }}>
          <span>{subject.name}</span>
          <h1
            style={{
              marginBottom: "-0.7rem",
              marginTop: "-0.6rem",
              padding: "0px",
            }}
          >
            {title}
          </h1>
          <span style={{ fontWeight: "lighter" }}>@{authorId.name}</span>
          <p style={{ marginTop: "1rem", margin: "0px", fontSize: "1.5rem" }}>
            {content}
          </p>
          <span>
            <i className="fas fa-link" style={{ marginRight: "10px" }} />
            <a href={contentUrl}>URL</a>
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
            <i className="fas fa-arrow-up" />
          </Button>
          {votes}
          <Button className="iconButton">
            <i className="fas fa-arrow-down" />
          </Button>
        </span>
        <span style={{ marginRight: "1.5em", fontWeight: "bold" }}>
          <Button className="iconButton">
            <i className="fas fa-comment-dots" />
          </Button>
          {replies ? replies.length : 0}
        </span>
        <span>
          <Button className="iconButton">
            <i className="fas fa-share"></i>
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
