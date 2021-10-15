import React from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import ProfileRightBar from "../profileRightBar/ProfileRightBar";
import giftImg from "../../assets/gift.png";
import adImg from "../../assets/ad.png";

function Rightbar({ profile }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {!profile && (
          <>
            <div className="birthdayContainer">
              <img className="birthdayImg" src={giftImg} alt="" />
              <span className="birthdayText">
                <b>Pola Foster</b> and <b>3 orther friend</b> have a birth dat
                today
              </span>
            </div>

            <img className="rightbarAd" src={adImg} alt="" />

            <h4 className="rightbarTitle">Online Friends</h4>

            <ul className="rightbarFriendList">
              {Users.map((user) => (
                <Online key={user.id} user={user} />
              ))}
            </ul>
          </>
        )}
        {profile && <ProfileRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
