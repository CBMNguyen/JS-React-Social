import React, { useEffect, useState } from "react";
import "./conversation.css";
import noAvatarImg from "../../assets/person/noAvatar.png";
import userApi from "api/user";
import { useSelector } from "react-redux";
function Conversation({ conversation, currentUser }) {
  const { onlineUsers } = useSelector((state) => state.messenger);

  const [user, setUser] = useState({});
  const [online, setOnline] = useState(false);

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
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
