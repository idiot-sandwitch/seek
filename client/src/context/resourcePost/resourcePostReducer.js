import { GET_N_POSTS, SET_PAGE, SET_POSTS, SET_LOADING } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_N_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
        loading: false,
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
  }
};
