import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import messengerApi from "api/messenger";
import userApi from "api/user";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { StyledBadge } from "utils/common";
import noAvatarImg from "../../assets/person/noAvatar.png";
function Conversation({ conversation, currentUser }) {
  const { onlineUsers } = useSelector((state) => state.notification);
  const [user, setUser] = useState({});

  const [lastMessage, setLastMessage] = useState({});
  const [userNameSendMessage, setUserNameSendMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { messages } = await messengerApi.getMessages(conversation._id);
        const message = { ...messages[messages.length - 1] };
        setLastMessage(message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [conversation._id]);

  useEffect(() => {
    const getUser = async () => {
      const data = await userApi.getUserById(lastMessage.senderId);
      setUserNameSendMessage(data.user.username);
    };
    lastMessage.senderId && getUser();
  }, [lastMessage.senderId]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      const data = await userApi.getUserById(friendId);
      setUser(data.user);
    };
    getUser();
  }, [conversation.members, currentUser._id]);

  return lastMessage?.text ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": { backgroundColor: "rgb(231, 228, 228)" },
      }}
    >
      <StyledBadge
        variant={onlineUsers.includes(user?._id) ? "dot" : ""}
        color={onlineUsers.includes(user?._id) ? "success" : "default"}
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          src={
            user?.profilePicture?.length > 0
              ? `${process.env.REACT_APP_API_URL}/${
                  user?.profilePicture[user?.profilePicture?.length - 1]
                }`
              : noAvatarImg
          }
          sx={{ width: "42px", height: "42px" }}
        />
      </StyledBadge>

      <Box sx={{ ml: 2, width: "100%" }}>
        <Box
          sx={{
            textTransform: "capitalize",
            fontWeight: 500,
            marginBottom: "4px",
          }}
        >
          {user?.username}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          <Box>{`${
            userNameSendMessage === currentUser?.username
              ? "You"
              : userNameSendMessage
          }: ${lastMessage?.text}`}</Box>
          <Box sx={{ fontSize: "12px" }}>{format(lastMessage?.createdAt)}</Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
}

export default Conversation;
