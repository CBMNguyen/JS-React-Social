import React from "react";
import "./closeFriend.css";
import noAvatarImg from "../../assets/person/noAvatar.png";

function CloseFriend({ user }) {
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={user?.profilePicture || noAvatarImg}
        alt="friend"
      />
      <span>{user?.username}</span>
    </li>
  );
}

export default CloseFriend;
