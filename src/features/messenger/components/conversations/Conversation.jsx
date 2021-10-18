import React, { useEffect, useState } from "react";
import "./conversation.css";
import noAvatarImg from "../../../../assets/person/noAvatar.png";
import userApi from "api/user";
function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      const data = await userApi.getUserById(friendId);
      setUser(data.user);
    };
    getUser();
  }, [conversation.members, currentUser._id]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture || noAvatarImg}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
