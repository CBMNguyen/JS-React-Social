import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "api/auth";
import userApi from "api/user";
import { rejectedState, pendingState } from "utils/common";

const initialState = {
  user: null,
  token: null,
  error: "",
  loading: false,
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
  async (data, { rejectWithValue, fulfillWithValue }) => {
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
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const user = await userApi.getUserById(id);
      return fulfillWithValue(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, user }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await userApi.update(id, user);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: pendingState,
    [login.rejected]: rejectedState,
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.token = action.payload.accessToken;
    },

    [getMe.pending]: (state) => pendingState,
    [getMe.rejected]: rejectedState,
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload.user;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
