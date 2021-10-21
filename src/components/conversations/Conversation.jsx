import React, { useEffect, useState } from "react";
import "./conversation.css";
import noAvatarImg from "../../assets/person/noAvatar.png";
import userApi from "api/user";
import { useSelector } from "react-redux";
import messengerApi from "api/messenger";
import { format } from "timeago.js";
function Conversation({ conversation, currentUser }) {
  const { onlineUsers } = useSelector((state) => state.messenger);

  const [user, setUser] = useState({});
  const [online, setOnline] = useState(false);

  const [lastMessage, setLastMessage] = useState({});
  const [userNameSendMessage, setUserNameSendMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { messages } = await messengerApi.getMessages(conversation._id);
        const { text, senderId, createdAt } = messages[messages.length - 1];
        setLastMessage({ text, senderId, createdAt });
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

  useEffect(() => {
    const isOnline = onlineUsers?.includes(user?._id);
    setOnline(isOnline);
  }, [onlineUsers, user]);

  return (
    <div className="conversation">
      <div style={{ position: "relative", width: "40px", height: "40px" }}>
        <img
          className="conversationImg"
          src={user?.profilePicture || noAvatarImg}
          alt=""
        />
        {online && <div className="conversationBadge"></div>}
      </div>
      <div className="conversationItem">
        <div className="conversationItemName">{user?.username}</div>
        <div className="conversationItemMessage">
          <div>{`${
            userNameSendMessage === currentUser?.username
              ? "You"
              : userNameSendMessage
          }: ${lastMessage?.text}`}</div>
          <div>{format(lastMessage?.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
