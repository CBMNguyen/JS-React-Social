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

export const getPostOfMe = createAsyncThunk(
  "post/getPostOfMe",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message, posts } = await postApi.getPostOfMe(id);
      return fulfillWithValue({ message, posts });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const likeAndDislike = createAsyncThunk(
  "post/likeAndDislike",
  async ({ postId, state, userId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await postApi.likeAndDislike(postId, state);
      return fulfillWithValue({ message, postId, state, userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const likeAndDislikeComment = createAsyncThunk(
  "post/likeAndDislikeComment",
  async (
    { postId, state, commentId, userId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { message } = await postApi.likeAndDislikeComment(
        postId,
        state,
        commentId
      );
      return fulfillWithValue({ message, postId, state, commentId, userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createComment = createAsyncThunk(
  "post/createComment",
  async ({ postId, text }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message, comment } = await postApi.createComment(postId, text);
      return fulfillWithValue({ message, postId, comment });
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
  reducers: {
    createCommentSocket: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) post.comments.push(comment);
    },
    createLikeSocket: (State, action) => {
      const { postId, state, userId } = action.payload;
      const postIndex = State.posts.findIndex((post) => post._id === postId);
      const currentPost = State.posts[postIndex];

      if (!currentPost.likes.some((like) => like.userId === userId)) {
        currentPost.likes.push({ userId, state });
      } else {
        if (
          currentPost.likes.some(
            (like) => like.userId === userId && like.state === state
          )
        ) {
          currentPost.likes = currentPost.likes.filter(
            (like) => like.userId !== userId
          );
        } else {
          currentPost.likes = currentPost.likes.map((like) => {
            if (like.userId === userId) return { ...like, state: state };
            return like;
          });
        }
      }
    },
  },
  extraReducers: {
    [getTimeLine.pending]: pendingState,
    [getTimeLine.rejected]: rejectedState,
    [getTimeLine.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload.posts;
    },
    [getPostOfMe.pending]: pendingState,
    [getPostOfMe.rejected]: rejectedState,
    [getPostOfMe.fulfilled]: (state, action) => {
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

    [createComment.pending]: pendingState,
    [createComment.rejected]: rejectedState,
    [createComment.fulfilled]: (state, action) => {
      const { postId, comment } = action.payload;
      state.loading = false;
      const post = state.posts.find((post) => post._id === postId);
      if (post) post.comments.push(comment);
      state.error = "";
    },

    [likeAndDislike.pending]: pendingState,
    [likeAndDislike.rejected]: rejectedState,
    [likeAndDislike.fulfilled]: (State, action) => {
      const { postId, state, userId } = action.payload;
      const postIndex = State.posts.findIndex((post) => post._id === postId);
      const currentPost = State.posts[postIndex];

      if (!currentPost.likes.some((like) => like.userId === userId)) {
        currentPost.likes.push({ userId, state });
      } else {
        if (
          currentPost.likes.some(
            (like) => like.userId === userId && like.state === state
          )
        ) {
          currentPost.likes = currentPost.likes.filter(
            (like) => like.userId !== userId
          );
        } else {
          currentPost.likes = currentPost.likes.map((like) => {
            if (like.userId === userId) return { ...like, state: state };
            return like;
          });
        }
      }
      State.loading = false;
      State.error = "";
    },

    [likeAndDislikeComment.pending]: pendingState,
    [likeAndDislikeComment.rejected]: rejectedState,
    [likeAndDislikeComment.fulfilled]: (State, action) => {
      const { postId, state, commentId, userId } = action.payload;
      const postIndex = State.posts.findIndex((post) => post._id === postId);
      const commentIndex = State.posts[postIndex].comments.findIndex(
        (comment) => comment._id === commentId
      );

      const currentComment = State.posts[postIndex].comments[commentIndex];

      if (!currentComment.likes.some((like) => like.userId === userId)) {
        currentComment.likes.push({ userId, state });
      } else {
        if (
          currentComment.likes.some(
            (like) => like.userId === userId && like.state === state
          )
        ) {
          currentComment.likes = currentComment.likes.filter(
            (like) => like.userId !== userId
          );
        } else {
          currentComment.likes = currentComment.likes.map((like) => {
            if (like.userId === userId) {
              return { ...like, state: state };
            }
            return like;
          });
        }
      }

      State.loading = false;
      State.error = "";
    },
  },
});

const { reducer, actions } = postSlice;
export const { createCommentSocket, createLikeSocket } = actions;
export default reducer;
