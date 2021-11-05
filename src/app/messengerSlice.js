import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messengerApi from "api/messenger";
import { pendingState, rejectedState } from "utils/common";

const initialState = {
  conversations: [],
  currentChat: null,
  messages: [],
  arrivalMessage: null,
  error: "",
  loading: false,
};

export const getConversations = createAsyncThunk(
  "get/getConversations",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { conversation } = await messengerApi.getConversations(userId);
      return fulfillWithValue({ conversation });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMessages = createAsyncThunk(
  "get/getMessages",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { messages } = await messengerApi.getMessages(userId);
      return fulfillWithValue({ messages });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },

    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },

    setArrivalMessage: (state, action) => {
      state.arrivalMessage = action.payload;
    },
  },
  extraReducers: {
    [getConversations.pending]: pendingState,
    [getConversations.rejected]: rejectedState,
    [getConversations.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.conversations = action.payload.conversation;
    },

    [getMessages.pending]: pendingState,
    [getMessages.rejected]: rejectedState,
    [getMessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
      state.messages = action.payload.messages;
    },
  },
});

const { reducer, actions } = messengerSlice;
export const { setCurrentChat, setMessages, setArrivalMessage } = actions;
export default reducer;
