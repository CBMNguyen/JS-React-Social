import React from "react";
import "./notfound.css";
import broken from "../../assets/person/imbroken.gif";

function NotFound(props) {
  return (
    <div className="FourOhFour">
      <div className="page-container">
        <div
          className="bg"
          style={{ backgroundImage: "url(" + broken + ")" }}
        ></div>
        <div className="code">404</div>
      </div>
    </div>
  );
}

export default NotFound;
