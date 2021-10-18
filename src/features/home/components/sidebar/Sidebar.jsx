import CloseFriend from "components/closeFriend/CloseFriend";
import { sidebarList } from "constants/global";
import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ friends }) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {sidebarList.map((item) => (
            <li key={item.name} className="sidebarListItem">
              {item.icon}
              <span className="sidebarListItemText">{item.name}</span>
            </li>
          ))}
        </ul>

        <button className="sidebarButton">Show more</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {friends.map((user) => (
            <Link
              key={user._id}
              style={{ color: "#000", textDecoration: "none" }}
              to={`/profile/${user._id}`}
            >
              <CloseFriend user={user} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
