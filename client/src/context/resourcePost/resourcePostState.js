import React, { useReducer } from "react";
import axios from "axios";
import ResourcePostContext from "./resourcePostContext";
import resourecePostReducer from "./resourcePostReducer";
import { GET_N_POSTS, SET_PAGE, SET_POSTS, SET_LOADING } from "../types";

const ResourcePostState = (props) => {
  const initialState = {
    posts: [
      {
        votes: 0,
        replies: [],
        editorChoice: false,
        _id: "6052e76396c808549cecf084",
        title: "NodeJS tutorial by mosh",
        content: "Good course, very cool",
        authorId: {
          avatar: "http://localhost:3000/default_avatar.jpg",
          _id: "602cd33c38c2747b15b7fefc",
          name: "Bhendi",
        },
        subject: {
          _id: "6026c8b30bdf2031385d3da2",
          name: "physics",
        },
        course: "602d1c195fdcb95481d93412",
        contentUrl: "https://youtube.com/watch?v=5qap5aO4i9A",
        createdAt: "2021-02-17T14:55:33.887Z",
        updatedAt: "2021-02-17T14:55:33.887Z",
        __v: 0,
      },
      {
        votes: 0,
        replies: [],
        editorChoice: false,
        _id: "6052e76596c808549cecf085",
        title: "NodeJS tutorial by mosh",
        content: "Good course, very cool",
        authorId: {
          avatar: "http://localhost:3000/default_avatar.jpg",
          _id: "602cd33c38c2747b15b7fefc",
          name: "Bhendi",
        },
        subject: {
          _id: "6026c8b30bdf2031385d3da2",
          name: "physics",
        },
        course: "602d1c195fdcb95481d93412",
        contentUrl: "https://youtube.com/watch?v=5qap5aO4i9A",
        createdAt: "2021-02-17T14:55:33.887Z",
        updatedAt: "2021-02-17T14:55:33.887Z",
        __v: 0,
      },
      {
        votes: 0,
        replies: [],
        editorChoice: false,
        _id: "6052e76396c808549cecf084",
        title: "NodeJS tutorial by mosh",
        content: "Good course, very cool",
        authorId: {
          avatar: "http://localhost:3000/default_avatar.jpg",
          _id: "602cd33c38c2747b15b7fefc",
          name: "Bhendi",
        },
        subject: {
          _id: "6026c8b30bdf2031385d3da2",
          name: "physics",
        },
        course: "602d1c195fdcb95481d93412",
        contentUrl: "https://youtube.com/watch?v=5qap5aO4i9A",
        createdAt: "2021-02-17T14:55:33.887Z",
        updatedAt: "2021-02-17T14:55:33.887Z",
        __v: 0,
      },
      {
        votes: 0,
        replies: [],
        editorChoice: false,
        _id: "6052e76596c808549cecf085",
        title: "NodeJS tutorial by mosh",
        content: "Good course, very cool",
        authorId: {
          avatar: "http://localhost:3000/default_avatar.jpg",
          _id: "602cd33c38c2747b15b7fefc",
          name: "Bhendi",
        },
        subject: {
          _id: "6026c8b30bdf2031385d3da2",
          name: "physics",
        },
        course: "602d1c195fdcb95481d93412",
        contentUrl: "https://youtube.com/watch?v=5qap5aO4i9A",
        createdAt: "2021-02-17T14:55:33.887Z",
        updatedAt: "2021-02-17T14:55:33.887Z",
        __v: 0,
      },
    ],
    page: 0,
    loading: false,
  };

  const [state, dispatch] = useReducer(resourecePostReducer, initialState);

  const getnPosts = async (page, results) => {
    console.log("page:", { page });
    console.log("results:", { results });
    const res = await axios.get(
      `http://localhost:5000/api/resourceposts/page/${page}/${results}`
    );
    console.log(res.data);

    dispatch({ type: GET_N_POSTS, payload: res.data });
  };

  const setPosts = (newPosts) => {
    dispatch({ type: SET_POSTS, payload: newPosts });
  };
  const setPage = (page) => {
    dispatch({ type: SET_PAGE, payload: page });
  };

  const setLoading = (loading) => {
    dispatch({ type: SET_LOADING, payload: loading });
  };

  return (
    <ResourcePostContext.Provider
      value={{
        posts: state.posts,
        loading: state.loading,
        page: state.page,
        getnPosts,
        setPage,
        setPosts,
        setLoading,
      }}
    >
      {props.children}
    </ResourcePostContext.Provider>
  );
};

export default ResourcePostState;
