import React from "react";
import "./message.css";
import noAvatarImg from "../../assets/person/noAvatar.png";
import classNames from "classnames";
import { format } from "timeago.js";

function Message({ own, message }) {
  return (
    <div className={classNames("message", { own: !own })}>
      <div className="messageTop">
        <img className="messageImg" src={noAvatarImg} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
