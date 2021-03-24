import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { HashLink as Link } from "react-router-hash-link";

export const Comment_item = () => {
  return (
    <Container
      style={{
        marginTop: "4rem",
        backgroundColor: "red",
      }}
    >
      <Container className="seekCommentBox">
        <h1>COMMENT BOX</h1>
        <Row id="pappuId" className="seekComment">
          <Container>
            {" "}
            <h5>PappuHalwaai</h5>{" "}
            <p>
              I had no idea when I would be ready to write this. Part of me
              thought it would be early on, when I was still really feeling the
              pain of what happened. I thought I would sit in the corner of my
              bedroom with the lights dimmed, just rolling off my thoughts. I’d
              have a glass of red wine, cozy up with a blanket, and finally get
              the chance to address “what happened”.
            </p>
            <span>
              <Button className="iconButton">
                <i className="fas fa-arrow-up" />
              </Button>
              69
              <Button className="iconButton">
                <i className="fas fa-arrow-down" />
              </Button>
              <span />
              <span style={{ marginRight: "1.5em", fontWeight: "bold" }}></span>
              <Button className="iconButton">
                <i className="fas fa-comment-dots" />
              </Button>
              420
            </span>
          </Container>
        </Row>
        <Row className="seekSubComment">
          <Container>
            <span style={{ whiteSpace: "nowrap" }}>
              <h5 style={{ display: "inline-block" }}>TappuHalwaai</h5>{" "}
              <Link smooth to="/teachers#pappuId">
                @PappuHalwaai
              </Link>
            </span>
            <p>
              I had no idea when I would be ready to write this. Part of me
              thought it would be early on, when I was still really feeling the
              pain of what happened. I thought I would sit in the corner of my
              bedroom with the lights dimmed, just rolling off my thoughts. I’d
              have a glass of red wine, cozy up with a blanket, and finally get
              the chance to address “what happened”.
            </p>
            <span>
              <Button className="iconButton">
                <i className="fas fa-arrow-up" />
              </Button>
              69
              <Button className="iconButton">
                <i className="fas fa-arrow-down" />
              </Button>
              <span />
              <span style={{ marginRight: "1.5em", fontWeight: "bold" }}></span>
              <Button className="iconButton">
                <i className="fas fa-comment-dots" />
              </Button>
              420
            </span>
          </Container>
        </Row>
      </Container>
    </Container>
  );
};
