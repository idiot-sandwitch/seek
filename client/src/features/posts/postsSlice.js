import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosSetup";
import toast from "react-hot-toast";

const initialState = {
  posts: [],
  page: 0,
  hasMore: true,
  status: "idle",
  error: null,
};

const getnPosts = createAsyncThunk(
  "posts/fetch",
  async ({ page, results }, thunkAPI) => {
    try {
      const res = await axios({
        method: "GET",
        url: `api/resourceposts/page/${page}/${results}`,
      });
      if (res.status === 200) return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const upvote = createAsyncThunk(
  "posts/upvoteSinglePost",
  async (id, thunkAPI) => {
    try {
      const res = await axios({
        method: "PUT",
        url: "api/resourceposts/upvote",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: JSON.stringify({ id }),
      });
      if (res.status === 200) {
        const { data } = await axios({
          method: "GET",
          url: `api/resourceposts/find/${id}`,
        });
        return { newPost: data, id };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const downvote = createAsyncThunk(
  "posts/downvoteSinglePost",
  async (id, thunkAPI) => {
    try {
      const res = await axios({
        method: "PUT",
        url: "api/resourceposts/downvote",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: JSON.stringify({ id }),
      });
      if (res.status === 200) {
        const { data } = await axios({
          method: "GET",
          url: `api/resourceposts/find/${id}`,
        });
        return { newPost: data, id };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearState: (state) => {
      state.posts = [];
      state.page = 0;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
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
    pushSinglePost: (state, { payload }) => {
      state.posts.push(payload);
    },
  },
  extraReducers: {
    [getnPosts.fulfilled]: (state, { payload }) => {
      if (payload.length !== 0) {
        payload.forEach((post) => state.posts.push(post));
        state.hasMore = true;
      } else {
        state.hasMore = false;
      }
      state.status = "succeeded";
      state.error = null;
    },
    [getnPosts.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
      toast.error(payload);
    },
    [upvote.fulfilled]: (state, { payload }) => {
      state.posts.find((post) => post._id === payload.id).votes =
        payload.newPost.votes;
    },
    [upvote.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [downvote.fulfilled]: (state, { payload }) => {
      state.posts.find((post) => post._id === payload.id).votes =
        payload.newPost.votes;
    },
    [downvote.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
  },
});

export { getnPosts, upvote, downvote };

export const {
  clearState,
  setPosts,
  setPage,
  setStatus,
  pushSinglePost,
} = postsSlice.actions;

export default postsSlice.reducer;
