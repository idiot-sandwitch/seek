import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { PostItem } from "../layout/post_item";
import InfiniteScroll from "react-infinite-scroll-component";
import { setPage, setStatus, getnPosts } from "../../features/user/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import AlertContext from "../../context/alert/alertContext";

export const ResourcePosts = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.posts);
  const { posts, page } = postState;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  useEffect(() => {
    dispatch(setStatus("loading"));
    dispatch(getnPosts({ page, results: 4 }));
  }, []);

  const loadPosts = () => {
    dispatch(setPage(page + 1));
    dispatch(setStatus("loading"));
    dispatch(getnPosts({ page: page, results: 4 }));
  };

  const pageEnd = () => {
    //return false if no change in posts state
    return true;
  };

  const handleClick = () => {
    setAlert("danger", "Why you touch me?");
  };
  

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
            <i className='fas fa-plus'></i> Create Post
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
