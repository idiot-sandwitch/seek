import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import postsReducer from "./features/posts/postsSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    posts: postsReducer,
  },
});

export default store;
