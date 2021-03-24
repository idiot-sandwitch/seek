import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { PostItem } from "../layout/post_item";
import InfiniteScroll from "react-infinite-scroll-component";
import { setPage, setStatus, getnPosts } from "../../features/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";

export const ResourcePosts = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.posts);
  const { posts, page } = postState;

  useEffect(() => {
    dispatch(setStatus("loading"));
    dispatch(getnPosts({ page, results: 4 }));
  }, []);

  const loadPosts = () => {
    dispatch(setPage(page + 1));
    dispatch(setStatus("loading"));
    dispatch(getnPosts({ page: page, results: 4 }));
  };

  //FIXME: make this return false when load posts run but posts state does not change
  const pageEnd = () => {
    //return false if no change in posts state
    return true;
  };

  //, height: "800px", overflowY: "scroll"

  return (
    <Container style={{ marginTop: "4rem" }}>
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
        hasMore={pageEnd}
        loader={<h4>Loading</h4>}
        style={{ magin: "0px" }}
        endMessage={<h4>End of posts</h4>}
      >
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
};
