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

export const getnPosts = createAsyncThunk(
  "posts/fetch",
  async ({ page, results }, thunkAPI) => {
    try {
      const res = await axios({
        method: "GET",
        url: `api/resourceposts/page/${page}/${results}`,
      });
      if (res.status === 200) return res.data;
      else return thunkAPI.rejectWithValue(res.data);
    } catch (err) {
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
  },
});

export const { setPosts, setPage, setStatus } = postsSlice.actions;

export default postsSlice.reducer;
