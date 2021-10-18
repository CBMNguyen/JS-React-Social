import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "api/post";
import { pendingState, rejectedState } from "utils/common";

const initialState = {
  posts: [],
  error: "",
  loading: false,
};

export const getTimeLine = createAsyncThunk(
  "post/getTimeLine",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message, posts } = await postApi.getTimeLine(id);
      return fulfillWithValue({ message, posts });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const likeAndDislike = createAsyncThunk(
  "post/likeAndDislike",
  async (postId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await postApi.likeAndDislike(postId);
      return fulfillWithValue({ message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message, post } = await postApi.create(data);
      return fulfillWithValue({ message, post });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getTimeLine.pending]: pendingState,
    [getTimeLine.rejected]: rejectedState,
    [getTimeLine.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload.posts;
    },

    [createPost.pending]: pendingState,
    [createPost.rejected]: rejectedState,
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts.push(action.payload.post);
    },
  },
});

const { reducer } = postSlice;
export default reducer;
