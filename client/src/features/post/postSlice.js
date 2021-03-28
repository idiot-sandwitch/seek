import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../axiosSetup";
const initialState = {
  data: null,
  status: "idle",
  error: null,
};
const loadPost = createAsyncThunk("post/load", async (id, thunkAPI) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/resourceposts/find/${id}?comments`,
    });
    if (res.status === 200) return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const upvote = createAsyncThunk(
  "post/upvoteSinglePost",
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
        console.log(data);
        return data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const downvote = createAsyncThunk(
  "post/downvoteSinglePost",
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
        return data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const voteComment = createAsyncThunk(
  "post/commentVote",
  async ({ commentId, vote }, thunkAPI) => {
    try {
      const res = await axios({
        method: "PUT",
        url: `api/comments/${vote ? "upvote" : "downvote"}`,
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: JSON.stringify({ id: commentId }),
      });
      if (res.status === 200) {
        const { data } = await axios({
          method: "GET",
          url: `api/comments/find/${commentId}`,
        });
        return data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const voteSubComment = createAsyncThunk(
  "post/subCommentVote",
  async ({ subCommentId, vote }, thunkAPI) => {
    try {
      const res = await axios({
        method: "PUT",
        url: `api/subcomments/${vote ? "upvote" : "downvote"}`,
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: JSON.stringify({ id: subCommentId }),
      });
      if (res.status === 200) {
        const { data } = await axios({
          method: "GET",
          url: `api/subcomments/find/${subCommentId}`,
        });
        return data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearState: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [loadPost.pending]: (state) => {
      // state.data = null;
      state.status = "loading";
    },
    [loadPost.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = "succeded";
      state.error = null;
    },
    [loadPost.rejected]: (state, { payload }) => {
      state.data = null;
      state.status = "failed";
      state.error = payload;
      toast.error(payload);
    },
    [upvote.fulfilled]: (state, { payload }) => {
      state.data.votes = payload.votes;
    },
    [upvote.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [downvote.fulfilled]: (state, { payload }) => {
      state.data.votes = payload.votes;
    },
    [downvote.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [voteComment.fulfilled]: (state, { payload }) => {
      state.data.comments.find((comment, index) => {
        if (comment._id === payload._id) {
          state.data.comments[index].votes = payload.votes;
          return true;
        }
        return false;
      });
    },
    [voteComment.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [voteSubComment.fulfilled]: (state, { payload }) => {
      state.data.comments.find((comment, i) => {
        if (comment._id === payload.commentId) {
          state.data.comments[i].subComments.find((subcomment, j) => {
            if (subcomment._id === payload._id) {
              state.data.comments[i].subComments[j].votes = payload.votes;
              return true;
            }
            return false;
          });
          return true;
        }
        return false;
      });
    },
    [voteSubComment.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
  },
});

export { loadPost, upvote, downvote, voteComment, voteSubComment };
export const { clearState } = postSlice.actions;
export default postSlice.reducer;
