import React from "react";
import "./chatOnline.css";
import noAvatarImg from "../../../../assets/person/noAvatar.png";

function chatOnline(props) {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={noAvatarImg} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  );
}

export default chatOnline;
