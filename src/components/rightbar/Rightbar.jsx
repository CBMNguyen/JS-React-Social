import React from "react";
import adImg from "../../assets/ad.png";
import giftImg from "../../assets/gift.png";
import Online from "../onlineFriend/Online";
import "./rightbar.css";

function Rightbar({ friends }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src={giftImg} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 orther friend</b> have a birth dat today
          </span>
        </div>

        <img className="rightbarAd" src={adImg} alt="" />

        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="rightbarFriendList">
          {friends.map((user) => (
            <Online key={user._id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Rightbar;
