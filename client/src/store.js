import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import postsReducer from "./features/posts/postsSlice";
import postReducer from "./features/post/postSlice";
const store = configureStore({
  reducer: {
    auth: userReducer,
    posts: postsReducer,
    post: postReducer,
  },
});

export default store;
