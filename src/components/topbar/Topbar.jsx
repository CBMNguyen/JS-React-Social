import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./topbar.css";
import person1 from "../../assets/person/1.jpeg";

function Topbar(props) {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="logo">Facebook</div>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <img className="topbarImg" src={person1} alt="adadasd" />
      </div>
    </div>
  );
}

export default Topbar;
