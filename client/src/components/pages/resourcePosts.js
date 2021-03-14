import React from "react";
import Container from "react-bootstrap/Container";
import { PostItem } from "../layout/post_item";

export const ResourcePosts = ({ posts }) => {
  return (
    <Container style={{ marginTop: "3rem" }}>
      {posts.map((post) => (
        <PostItem key={post.title} post={post} />
      ))}
    </Container>
  );
};
