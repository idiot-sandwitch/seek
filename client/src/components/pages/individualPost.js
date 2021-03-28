import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import Media from "react-bootstrap/esm/Media";
import Button from "react-bootstrap/esm/Button";
import { Comments } from "../layout/comments/comments";

import { clearState, loadPost } from "../../features/post/postSlice";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { upvote, downvote } from "../../features/post/postSlice";
import toast from "react-hot-toast";

//TODO: Add a close post button
export const IndividualPost = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postId = match.params.id;
  const { data, status, error } = useSelector((state) => state.post);
  const rpost = {
    title: "titile",
    content: "aaa",
    type: "",
    authorId: { name: "AAA" },
    contentUrl: "123",
    votes: "232312",
    comments: [
      {
        authorId: 12324,
        postId: 23123,
        content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address what happened.`,
        votes: 32,
        subComments: [
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 223321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 23211,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
        ],
      },
      {
        authorId: 12354,
        postId: 23123,
        content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address what happened.`,
        votes: 32,
        subComments: [
          {
            authorId: 23281,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
        ],
      },
      {
        authorId: 12364,
        postId: 23123,
        content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address what happened.`,
        votes: 32,
        subComments: [
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
        ],
      },
      {
        authorId: 12384,
        postId: 23123,
        content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address what happened.`,
        votes: 32,
        subComments: [
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
        ],
      },
      {
        authorId: 12345,
        postId: 23123,
        content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address what happened.`,
        votes: 32,
        subComments: [
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
          {
            authorId: 2321,
            replyToId: 32312,
            content: ` I had no idea when I would be ready to write this. Part of me
                    thought it would be early on, when I was still really feeling the
                    pain of what happened. I thought I would sit in the corner of my
                    bedroom with the lights dimmed, just rolling off my thoughts. I’d
                    have a glass of red wine, cozy up with a blanket, and finally get
                    the chance to address “what happened”.`,
            votes: 69,
          },
        ],
      },
    ],
    editorChoice: true,
    course: { code: "AAAA" },
    subject: { name: "MAT101" },
  };

  useEffect(() => {
    dispatch(loadPost(postId));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === "failed") {
      history.push("/resources");
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [status]);
  if (status === "loading") return <p>Loading Post</p>;
  else if (status === "succeded") {
    const {
      _id,
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
      comments,
    } = data;

    const showEditorBadge = (isChoice) => {
      if (isChoice) {
        return (
          <Button className='badgeButton'>
            <Badge
              style={{
                borderColor: "gold",
                color: "gold",
              }}
            >
              <i style={{ marginRight: "10px" }} className='fas fa-star'></i>
              Editor's Choice
            </Badge>
          </Button>
        );
      } else return null;
    };

    return (
      <Container style={{ marginTop: "4rem" }}>
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
                <i className='fas fa-file-alt'></i>
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
              <p
                style={{ marginTop: "1rem", margin: "0px", fontSize: "1.5rem" }}
              >
                {content}
              </p>
              <span>
                <i className='fas fa-link' style={{ marginRight: "10px" }} />
                <a href={contentUrl}>URL</a>
              </span>
            </Media.Body>
          </Row>
          <Row
            style={{
              backgroundColor: "#292929",
              color: "white",
              padding: "0.6em",
            }}
          >
            <span style={{ marginRight: "1.5em", fontWeight: "bold" }}>
              <Button
                className='iconButton'
                onClick={() => dispatch(upvote(_id))}
              >
                <i className='fas fa-arrow-up' />
              </Button>
              {votes}
              <Button className='iconButton'>
                <i
                  className='fas fa-arrow-down'
                  onClick={() => dispatch(downvote(_id))}
                />
              </Button>
            </span>
            <span style={{ marginRight: "1.5em", fontWeight: "bold" }}>
              <Button className='iconButton'>
                <i className='fas fa-comment-dots' />
              </Button>
              {replies ? replies.length : 0}
            </span>
            <span>
              <Button
                className='iconButton'
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.REACT_APP_FRONTEND_URL}/#/post/${_id}`
                  );
                  toast.success("copied to clipboard");
                }}
              >
                <i className='fas fa-share'></i>
              </Button>
            </span>

            <span className='ml-auto mr-3'>
              {showEditorBadge(editorChoice)}
              <Button className='badgeButton'>
                <Badge>{course.code}</Badge>
              </Button>
            </span>
          </Row>
          <Row>
            <Comments comments={comments} />
          </Row>
        </Container>
      </Container>
    );
  } else {
    return <p>Hello</p>;
  }
};
