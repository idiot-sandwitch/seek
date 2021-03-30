import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { PostItem } from "../layout/post_item";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  setPage,
  setStatus,
  getnPosts,
  clearState,
} from "../../features/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "./posts/createPost";

export const ResourcePosts = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.posts);
  const { posts, page, hasMore } = postState;
  const [formIsVisible, setFormVisibility] = useState(false);

  useEffect(() => {
    if (posts) dispatch(clearState());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(setStatus("loading"));
    dispatch(getnPosts({ page, results: 4 }));
    dispatch(setPage(page + 1));
    // eslint-disable-next-line
  }, []);

  const loadPosts = () => {
    dispatch(setStatus("loading"));
    dispatch(getnPosts({ page: page, results: 4 }));
    dispatch(setPage(page + 1));
  };
  // const gotoCreatePage = () => {
  //   history.push("/createPost");
  // };

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
            onClick={() => setFormVisibility(!formIsVisible)}
          >
            <i className='fas fa-plus'></i> Create Post
          </Button>
        </Row>
        {formIsVisible && <CreatePost />}
      </Container>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
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
