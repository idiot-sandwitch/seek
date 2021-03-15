import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { PostItem } from "../layout/post_item";

export const ResourcePosts = ({ posts }) => {
  return (
    <Container style={{ marginTop: "3rem" }}>
      <Container style={{ width: "80rem", padding: "1rem" }}>
        <Row>
          <Button
            block
            style={{
              backgroundColor: "#6109B3",
              border: "none",
              fontSize: "2em",
            }}
          >
            <i class="fas fa-plus"></i> Create Post
          </Button>
        </Row>
      </Container>
      {posts.map((post) => (
        <PostItem key={post.title} post={post} />
      ))}
    </Container>
  );
};
