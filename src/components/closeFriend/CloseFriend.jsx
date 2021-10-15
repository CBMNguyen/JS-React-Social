import React from "react";
import "./closeFriend.css";
import person1 from "../../assets/person/1.jpeg";

function CloseFriend({ user }) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={person1} alt="" />
      <span>{user.username}</span>
    </li>
  );
}

export default CloseFriend;
