import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { PostItem } from "../layout/post_item";
import ResourcePostContext from "../../context/resourcePost/resourcePostContext";
import AlertContext from "../../context/alert/alertContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { SeekAlert } from "../layout/alert";

export const ResourcePosts = () => {
  const resourcePostContext = useContext(ResourcePostContext);
  const alertContext = useContext(AlertContext);
  const { posts, setLoading, getnPosts, page, setPage } = resourcePostContext;
  const { setAlert } = alertContext;

  const loadPosts = async () => {
    setPage(page + 1);
    setLoading(true);
    await getnPosts(page, 4);
  };

  const pageEnd = () => {
    //return false if no change in posts state
    return true;
  };

  const handleClick = () => {
    setAlert("danger", "Why you touch me?");
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
    <Container style={{ marginTop: "4rem" }}>
      <SeekAlert />
      <Container style={{ width: "100%", padding: "1rem" }}>
        <Row>
          <Button
            onClick={handleClick}
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
        hasMore={pageEnd}
        loader={<h4>Loading</h4>}
        style={{ magin: "0px" }}
        endMessage={<h4>Fuk off</h4>}
      >
        {posts.map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
};
