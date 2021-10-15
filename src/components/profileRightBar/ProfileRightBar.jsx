import React from "react";
import "./profileRightBar.css";

function ProfileRightBar() {
  return (
    <>
      <h4 className="rightbarTitle">Hey its profile</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City: </span>
          <span className="rightbarInfoValue">Vinh Long</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From: </span>
          <span className="rightbarInfoValue">Binh Minh</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship: </span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="/assets/person/1.jpeg"
            alt=""
          />
          <spa className="rightbarFollowingName">John Carter</spa>
        </div>

        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="/assets/person/2.jpeg"
            alt=""
          />
          <spa className="rightbarFollowingName">John Carter</spa>
        </div>

        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="/assets/person/3.jpeg"
            alt=""
          />
          <spa className="rightbarFollowingName">John Carter</spa>
        </div>

        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="/assets/person/4.jpeg"
            alt=""
          />
          <spa className="rightbarFollowingName">John Carter</spa>
        </div>

        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="/assets/person/5.jpeg"
            alt=""
          />
          <spa className="rightbarFollowingName">John Carter</spa>
        </div>

        <div className="rightbarFollowing">
          <img
            className="rightbarFollowingImg"
            src="/assets/person/6.jpeg"
            alt=""
          />
          <spa className="rightbarFollowingName">John Carter</spa>
        </div>
      </div>
    </>
  );
}

export default ProfileRightBar;
