import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { PostItem } from "../layout/post_item";
import ResourcePostContext from "../../context/resourcePost/resourcePostContext";
import InfiniteScroll from "react-infinite-scroll-component";

export const ResourcePosts = () => {
  const resourcePostContext = useContext(ResourcePostContext);
  const { posts, setLoading, getnPosts, page, setPage } = resourcePostContext;

  const loadPosts = async () => {
    setPage(page+1);
    setLoading(true);
    await getnPosts(page, 4);
  };

  // useEffect(() => {
  //   const loadPosts = async (page, results) => {
  //     setLoading(true);
  //     await getnPosts(page, results);
  //   };
  //   loadPosts(page, 3);
  // }, [page]);

  //, height: "800px", overflowY: "scroll"

  return (
    <Container style={{ marginTop: "3rem" }}>
      <Container style={{ width: "100%", padding: "1rem" }}>
        <Row>
          <Button
            block
            style={{
              backgroundColor: "#6109B3",
              border: "none",
              fontSize: "2em",
            }}
          >
            <i className="fas fa-plus"></i> Create Post
          </Button>
        </Row>
      </Container>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={true}
        loader={<h4>Loading</h4>}
        style={{ magin: "0px" }}
      >
        {posts.map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
};
