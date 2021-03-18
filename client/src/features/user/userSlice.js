import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle" | "loading" | "succeeded" | "failed" | "createdNew",
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
};

const headers = {
  "Content-Type": "application/json",
  accepts: "application/json",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/auth",
        headers,
        data: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 200) {
        const { data } = res;
        const user = JSON.stringify({
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", user);
        return data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err.response);
      console.log("error", err.response.data);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/users/add",
        headers,
        data: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 200) {
        const { data } = res;
        console.log(res);
        const user = JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
        });
        localStorage.setItem("user", user);
        return data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err.response);
      console.log("error", err.response.data);
      localStorage.removeItem("user");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  "/user/verifyEmail",
  async ({ token }, thunkAPI) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/verify",
        headers,
        data: JSON.stringify({ token }),
      });
      if (res.status === 200) {
        console.log(res);
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = "idle";
      state.token = "";
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.token = payload.token;
      state.user = payload.user;
      state.error = null;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.token = "";
      state.user = null;
      state.error = payload;
    },
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.user = payload;
      state.status = "createdNew";
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.user = null;
      state.error = payload;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
