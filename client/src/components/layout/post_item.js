import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import Media from "react-bootstrap/esm/Media";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { upvote, downvote } from "../../features/posts/postsSlice";
import toast from "react-hot-toast";

export const PostItem = ({
  post: {
    _id,
    title,
    content,
    type,
    authorId,
    contentUrl,
    votes,
    comments,
    editorChoice,
    course,
    subject,
  },
}) => {
  const dispatch = useDispatch();
  const handleUpvote = () => {
    dispatch(upvote(_id));
  };
  const handleDownvote = () => {
    dispatch(downvote(_id));
  };
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
          <Link
            className="postLinkText"
            to={`/post/${_id}`}
            style={{ margin: "auto" }}
          >
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
          </Link>
        </Media>
        <Media.Body style={{ padding: "1em" }}>
          <Link className="postLinkText" to={`/post/${_id}`}>
            {/* Should redirect to a list of posts sorted by the clicked subject */}
            <span>{subject.name}</span>{" "}
          </Link>
          <br></br>
          <Link className="postLinkText" to={`/post/${_id}`}>
            <h1
              style={{
                marginBottom: "-0.7rem",
                marginTop: "-0.6rem",
                padding: "0px",
                display: "inline-block",
              }}
            >
              {title}
            </h1>
          </Link>
          <br></br>
          <Link className="postLinkText" to={`/profile/${authorId._id}`}>
            {/* Should redirect to user profile page instead when that's ready.*/}
            <div
              style={{
                fontWeight: "lighter",
                marginTop: "0.5  rem",
                fontSize: "1.2rem",
                display: "inline-block",
              }}
            >
              @{authorId.name}
            </div>
          </Link>
          <br></br>
          <p style={{ marginTop: "1rem", margin: "0px", fontSize: "1.5rem" }}>
            {content}
          </p>
          <span>
            <i className="fas fa-link" style={{ marginRight: "10px" }} />
            <a href={contentUrl} target="_blank" rel="noopener noreferrer">
              URL
            </a>
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
          <Button className="iconButton upVoteButton" onClick={handleUpvote}>
            <i className="fas fa-arrow-up " />
          </Button>
          {votes}
          <Button
            className="iconButton downVoteButton"
            onClick={handleDownvote}
          >
            <i className="fas fa-arrow-down" />
          </Button>
        </span>
        <span style={{ marginRight: "1.5em", fontWeight: "bold" }}>
          <Link to={`/post/${_id}`}>
            <Button className="iconButton">
              <i className="fas fa-comment-dots" />
            </Button>
          </Link>
          {comments ? comments.length : 0}
        </span>
        <span>
          <Button
            className="iconButton"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.REACT_APP_FRONTEND_URL}/#/post/${_id}`
              );
              toast.success("copied to clipboard");
            }}
          >
            <i className="fas fa-share"></i>
          </Button>
        </span>

        <span className="ml-auto mr-3">
          {showEditorBadge(editorChoice)}
          <Button className="badgeButton">
            <Badge>{course.code}</Badge>
          </Button>
        </span>
      </Row>
    </Container>
  );
};
