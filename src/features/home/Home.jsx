import React from "react";
import "./home.css";
import Topbar from "../../components/topbar/Topbar";

import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";

function Home(props) {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
