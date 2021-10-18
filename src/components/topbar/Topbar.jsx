import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noAvatarImg from "../../assets/person/noAvatar.png";
import "./topbar.css";

function Topbar(props) {
  const { user } = useSelector((state) => state.user);

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
            <Tooltip title="Add Friends">
              <div className="topbarIconWrapper">
                <PersonIcon />
                <span className="topbarIconBadge">1</span>
              </div>
            </Tooltip>
          </div>

          <div className="topbarIconItem">
            <Tooltip title="Messenger">
              <div className="topbarIconWrapper">
                <ChatIcon />
                <span className="topbarIconBadge">1</span>
              </div>
            </Tooltip>
          </div>

          <div className="topbarIconItem">
            <Tooltip title="Notifications">
              <div className="topbarIconWrapper">
                <NotificationsIcon />
                <span className="topbarIconBadge">1</span>
              </div>
            </Tooltip>
          </div>
        </div>

        <Link
          style={{ textDecoration: "none", color: "#fff" }}
          to={`/profile/${user?._id}`}
        >
          <div className="topbarImgWrapper">
            <img
              className="topbarImg"
              src={user?.profilePicture || noAvatarImg}
              alt="avatar"
            />
            <span className="topbarProfileName">{user?.username}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
