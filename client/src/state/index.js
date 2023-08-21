import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  //this is our actions? u can think of it like functions that modify our state
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setDPost: (state, action) => {
      const deletedPosts = state.posts.filter((post) => {
        if (post._id !== action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = deletedPosts;
    },

  },

  
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost,setDPost } =
  authSlice.actions;
export default authSlice.reducer;

// so the reducer is auth slice 
//and the actions is the functions inside it