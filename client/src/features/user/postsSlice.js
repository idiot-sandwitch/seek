import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [
    {
      votes: 15000000000,
      replies: [],
      editorChoice: false,
      _id: "6052e76396c808549cecf084",
      title: "NodeJS tutorial by mosh",
      content: "Good course, very cool",
      authorId: "602cd33c38c2747b15b7fefc",
      subject: "6026c8b30bdf2031385d3da2",
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
      authorId: "602cd33c38c2747b15b7fefc",
      subject: "6026c8b30bdf2031385d3da2",
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
      authorId: "602cd33c38c2747b15b7fefc",
      subject: "6026c8b30bdf2031385d3da2",
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
      authorId: "602cd33c38c2747b15b7fefc",
      subject: "6026c8b30bdf2031385d3da2",
      course: "602d1c195fdcb95481d93412",
      contentUrl: "https://youtube.com/watch?v=5qap5aO4i9A",
      createdAt: "2021-02-17T14:55:33.887Z",
      updatedAt: "2021-02-17T14:55:33.887Z",
      __v: 0,
    },
  ],
  page: 0,
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

export const getnPosts = createAsyncThunk(
  "posts/fetch",
  async ({ page, results }, thunkAPI) => {
    try {
      console.log("page:", { page });
      console.log("results:", { results });
      const res = await axios({
        method: "GET",
        url: `http://localhost:5000/api/resourceposts/page/${page}/${results}`,
      });
      console.log(res.data);
      if (res.status === 200) return res.data;
      else return thunkAPI.rejectWithValue(res.data);
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts.push(payload);
      state.posts = "succeeded";
    },
    setPage: (state, { payload }) => {
      state.page = payload;
      state.status = "succeeded";
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: {
    [getnPosts.fulfilled]: (state, { payload }) => {
      state.posts.push(payload);
      state.status = "succeeded";
      state.error = null;
    },
    [getnPosts.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    },
  },
});

export const { setPosts, setPage, setStatus } = postsSlice.actions;

export default postsSlice.reducer;
