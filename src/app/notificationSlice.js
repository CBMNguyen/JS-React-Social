import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

const { reducer, actions } = notificationSlice;
export const { setOnlineUsers } = actions;
export default reducer;
