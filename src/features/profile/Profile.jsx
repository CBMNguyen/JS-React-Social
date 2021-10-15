import React from "react";
import "./profile.css";
import person1Img from "../../assets/person/1.jpeg";
import coverImg from "../../assets/post/3.jpeg";
import Sidebar from "components/sidebar/Sidebar";
import Topbar from "components/topbar/Topbar";
import Feed from "components/feed/Feed";
import Rightbar from "components/rightbar/Rightbar";

function Profile(props) {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={coverImg} alt="" />
              <img className="profileUserImg" src={person1Img} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Safak Kocaoglu</h4>
              <span className="profileInfoDesc">Hello my friend</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
