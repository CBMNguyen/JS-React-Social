import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setNotifications: (state, action) => {
      const { senderId, type, postId } = action.payload;
      if (
        !state.notifications.some(
          (notification) =>
            notification.senderId === senderId && notification.postId === postId
        )
      ) {
        state.notifications.push(action.payload);
      } else if (
        state.notifications.some(
          (notification) =>
            notification.senderId === senderId &&
            notification.postId === postId &&
            notification.type !== type
        )
      ) {
        const index = state.notifications.findIndex(
          (notification) =>
            notification.postId === postId && notification.senderId === senderId
        );

        state.notifications[index] = { ...state.notifications[index], type };
      } else {
        const index = state.notifications.findIndex(
          (notification) =>
            notification.postId === postId && notification.senderId === senderId
        );

        state.notifications.pop(index);
        return state;
      }
    },
  },
});

const { reducer, actions } = notificationSlice;
export const { setOnlineUsers, setNotifications } = actions;
export default reducer;
