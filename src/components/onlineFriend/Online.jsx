import React from "react";
import "./online.css";
import noAvatarImg from "../../assets/person/noAvatar.png";
import classNames from "classnames";

function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={user?.profilePicture || noAvatarImg}
          alt=""
        />
        <span
          className={classNames("rightbarOnline", {
            rightbarOffline: !user?.isOnline,
          })}
        ></span>
      </div>
      <span className="rightbarUserName">{user?.username}</span>
    </li>
  );
}

export default Online;
