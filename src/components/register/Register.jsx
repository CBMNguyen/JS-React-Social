import React from "react";
import "./register.css";

function Register(props) {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Facebook</h3>
          <span className="registerDesc">
            Connect with friends and the word around you on Lamasocial
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
            />
            <input type="text" placeholder="Email" className="registerInput" />
            <input
              type="text"
              placeholder="Password"
              className="registerInput"
            />
            <input
              type="text"
              placeholder="Password Again"
              className="registerInput"
            />
            <button className="registerButton">Sign Up</button>
            <span className="registerForgot">Forgot Password?</span>
            <button className="registerRegisterButton">Log into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
