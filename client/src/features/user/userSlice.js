import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";

const initialState = {
  status: "idle",
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
};

const headers = {
  "Content-Type": "application/json",
  accepts: "application/json",
};

const loginUser = createAsyncThunk(
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const signupUser = createAsyncThunk(
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
        return data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state = {
        status: "idle",
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
        error: null,
      };
    },
    logoutUser: (state) => {
      state.status = "idle";
      state.token = "";
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("You've been logged out successfully.");
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
      toast.success(
        `Welcome ${payload.user.name.split(" ")[0]}, happy seeking!`
      );
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.token = "";
      state.user = null;
      state.error = payload;
      toast.error(payload);
    },
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.status = "createdNew";
      state.error = null;
      toast.success(
        "Account created successfully! Check your email for verification"
      );
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
      toast.error(payload);
    },
  },
});

export { loginUser, signupUser };

export const { logoutUser, clearState } = userSlice.actions;

export default userSlice.reducer;
