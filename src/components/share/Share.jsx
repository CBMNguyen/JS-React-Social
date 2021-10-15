import React from "react";
import { shareList } from "../../constants/global";
import "./share.css";
import person1Img from "../../assets/person/1.jpeg";

function Share(props) {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={person1Img} alt="" />
          <input
            type="text"
            placeholder="What's in your mind Safak?"
            className="shareInput"
          />
        </div>

        <hr className="shareHr" />

        <div className="shareBottom">
          <div className="shareOptions">
            {shareList.map((item) => (
              <div className="shareOption">
                {item.icon}
                <span className="shareOptionText">{item.name}</span>
              </div>
            ))}
          </div>

          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}

export default Share;
