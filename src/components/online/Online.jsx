import React from "react";
import "./online.css";
import person1Img from "../../assets/person/1.jpeg";

function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={person1Img} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">{user.username}</span>
    </li>
  );
}

export default Online;
