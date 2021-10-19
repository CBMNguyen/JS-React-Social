import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import noAvatarImg from "../../../../assets/person/noAvatar.png";
import userApi from "api/user";
import axios from "axios";

function ChatOnline({ onlineUsers, currentUserId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { friendList } = await userApi.getFriends(currentUserId);
        setFriends(friendList);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (friend) => {
    try {
      const res = await axios.get(
        `http://localhost:2022/api/conversations/find/${currentUserId}/${friend._id}`
      );
      setCurrentChat(res.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div
          key={friend._id}
          className="chatOnlineFriend"
          onClick={() => handleClick(friend)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={friend.profilePicture || noAvatarImg}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
