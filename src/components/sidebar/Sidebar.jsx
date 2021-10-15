import React from "react";
import { sidebarList } from "../../constants/global";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import "./sidebar.css";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {sidebarList.map((item) => (
            <li className="sidebarListItem">
              {item.icon}
              <span className="sidebarListItemText">{item.name}</span>
            </li>
          ))}
        </ul>

        <button className="sidebarButton">Show more</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
