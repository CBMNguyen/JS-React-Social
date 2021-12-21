import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import userApi from "api/user";
import { getConversations } from "app/messengerSlice";
import { Message } from "constants/message.js";
import {
  addFollowerSocket,
  addFriend,
  addFriendSocket,
  addNotificationSocket,
  follow,
  removeFollowerSocket,
  removeFriendSocket,
  removeNotification,
  removeNotificationSocket,
  removeRequiredFriend,
} from "features/auth/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter, showToast } from "utils/common";
import TopBarCenter from "./topbarCenter/TopBarCenter.jsx";
import TopBarLeft from "./topbarLeft/TopBarLeft.jsx";
import TopBarRight from "./topbarRight/TopBarRight.jsx";

function Topbar({ socket }) {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.messenger);
  const { user } = useSelector((state) => state.user);

  // Fetch User when receive message
  const fetchUser = async (senderId, message) => {
    try {
      const { user } = await userApi.getUserById(senderId);
      showToast(
        `${capitalizeFirstLetter(user.username || "")} ${message}`,
        senderId
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get follow Notification
  useEffect(() => {
    socket?.on(Message.getFollowNotification, ({ senderId, type }) => {
      if (type === 9) {
        dispatch(addFollowerSocket(senderId));
        fetchUser(senderId, Message.followMessage);
      } else if (type === 1) {
        dispatch(addFollowerSocket(senderId));
      } else {
        dispatch(removeFollowerSocket(senderId));
        fetchUser(senderId, Message.unFollowMessage);
      }
    });
  }, [socket, dispatch]);

  // get add friend Notification
  useEffect(() => {
    socket?.on(Message.getNotification, ({ senderId }) => {
      if (user._id !== senderId) {
        dispatch(addNotificationSocket(senderId));
        fetchUser(senderId, Message.addFriendMessage);
      }
    });
  }, [socket, dispatch, user._id]);

  // remove add friend Notification
  useEffect(() => {
    socket?.on(Message.getRemoveNotification, ({ senderId }) => {
      if (user._id !== senderId) dispatch(removeNotificationSocket(senderId));
      try {
        dispatch(removeNotification(senderId));
      } catch (error) {
        console.log(error);
      }
    });
  }, [socket, dispatch, user._id]);

  // get response add friend request
  useEffect(() => {
    socket?.on(Message.getResponseNotification, ({ senderId, type }) => {
      dispatch(removeRequiredFriend(senderId));
      if (type > 0) {
        dispatch(addFriendSocket(senderId));
        user.notifications.includes(senderId) &&
          dispatch(removeNotificationSocket(senderId));
        fetchUser(senderId, Message.acceptFriendMessage);
      } else {
        fetchUser(senderId, Message.refuseFriendMessage);
      }
    });
  }, [socket, dispatch, user.notifications]);

  // get un friend request
  useEffect(() => {
    socket?.on(Message.getUnfriendNotification, ({ senderId }) => {
      dispatch(removeFriendSocket(senderId));
      fetchUser(senderId, Message.unFriendMessage);
    });
  }, [socket, dispatch]);

  // handle get Conversation
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await dispatch(getConversations(user._id));
      } catch (error) {
        console.log(error);
      }
    };
    user._id && fetchConversations();
  }, [user._id, dispatch]);

  // handle hide user chat bar
  const handleAcceptFriendRequest = async (userId) => {
    try {
      await dispatch(addFriend(userId));
      await dispatch(follow(userId));
      await dispatch(removeNotification(userId));
      dispatch(removeNotificationSocket(userId));

      socket.emit("responseNotification", {
        senderId: user._id,
        receiverId: userId,
        type: 9,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle hide user chat bar
  const handleRefuseFriendRequest = async (userId) => {
    try {
      await dispatch(removeNotification(userId));
      dispatch(removeNotificationSocket(userId));

      socket.emit("responseNotification", {
        senderId: user._id,
        receiverId: userId,
        type: -1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        height: "62px",
        backgroundColor: "#fff !important",
        boxShadow: "0px 0px 14px -8px rgba(0, 0, 0, 0.68)",
      }}
    >
      <Toolbar>
        <TopBarLeft user={user} />

        <TopBarCenter />

        <TopBarRight
          user={user}
          handleAcceptFriendRequest={handleAcceptFriendRequest}
          handleRefuseFriendRequest={handleRefuseFriendRequest}
          conversations={conversations}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
