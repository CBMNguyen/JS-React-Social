import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "api/auth";
import userApi from "api/user";
import { rejectedState, pendingState } from "utils/common";

const initialState = {
  user: {},
  token: null,
  error: "",
  loading: false,
  requiredFriends: [],
};

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await authApi.register(data);
      return fulfillWithValue({ message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const { message, accessToken } = await authApi.login(data);
      return fulfillWithValue({ message, accessToken });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMe = createAsyncThunk(
  "user/getMe",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { user, message } = await userApi.getMe();
      return fulfillWithValue({ user, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.addfriend(userId);
      return fulfillWithValue({ userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unFriend = createAsyncThunk(
  "user/unFriend",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.unfriend(userId);
      return fulfillWithValue({ userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const follow = createAsyncThunk(
  "user/follow",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.follow(userId);
      return fulfillWithValue({ userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unFollow = createAsyncThunk(
  "user/unFollow",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.unfollow(userId);
      return fulfillWithValue({ userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNotification = createAsyncThunk(
  "user/addNotification",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.addnotification(userId);
      return fulfillWithValue({ userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeNotification = createAsyncThunk(
  "user/removeNotification",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.removenotification(userId);
      return fulfillWithValue({ userId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, user }, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.update(id, user);
      return fulfillWithValue({ user });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requiredFriend: (state, action) => {
      state.requiredFriends.push(action.payload);
    },
    removeRequiredFriend: (state, action) => {
      state.requiredFriends = state.requiredFriends.filter(
        (id) => id !== action.payload
      );
      return state;
    },
    addNotificationSocket: (state, action) => {
      state.user.notifications.push(action.payload);
    },
    removeNotificationSocket: (state, action) => {
      state.user.notifications = state.user.notifications.filter(
        (id) => id !== action.payload
      );
      return state;
    },
    addFriendSocket: (state, action) => {
      state.user.friends.push(action.payload);
    },
    removeFriendSocket: (state, action) => {
      state.user.friends = state.user.friends.filter(
        (id) => id !== action.payload
      );
      return state;
    },
  },
  extraReducers: {
    [login.pending]: pendingState,
    [login.rejected]: rejectedState,
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.token = action.payload.accessToken;
    },

    [getMe.pending]: pendingState,
    [getMe.rejected]: rejectedState,
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload.user;
    },

    [updateUser.pending]: pendingState,
    [updateUser.rejected]: rejectedState,
    [updateUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.loading = false;
      state.error = "";
      state.user = { ...state.user, ...user };
    },

    [addFriend.pending]: pendingState,
    [addFriend.rejected]: rejectedState,
    [addFriend.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user.friends.push(action.payload.userId);
    },

    [unFriend.pending]: pendingState,
    [unFriend.rejected]: rejectedState,
    [unFriend.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user.friends = state.user.friends.filter(
        (userId) => userId !== action.payload.userId
      );
      return state;
    },

    [follow.pending]: pendingState,
    [follow.rejected]: rejectedState,
    [follow.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user.followings.push(action.payload.userId);
    },

    [unFollow.pending]: pendingState,
    [unFollow.rejected]: rejectedState,
    [unFollow.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user.followings = state.user.followings.filter(
        (userId) => userId !== action.payload.userId
      );
      return state;
    },

    [addNotification.pending]: pendingState,
    [addNotification.rejected]: rejectedState,
    [addNotification.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },

    [removeNotification.pending]: pendingState,
    [removeNotification.rejected]: rejectedState,
    [removeNotification.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user.notifications = state.user.notifications.filter(
        (userId) => userId !== action.payload.userId
      );
      return state;
    },
  },
});

export const {
  requiredFriend,
  removeRequiredFriend,
  addNotificationSocket,
  removeNotificationSocket,
  addFriendSocket,
  removeFriendSocket,
} = userSlice.actions;

const { reducer } = userSlice;
export default reducer;
