import jwt from "jsonwebtoken";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute(props) {
  const { token } = useSelector((state) => state.user);
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        try {
          jwt.verify(token, process.env.REACT_APP_JWT_KEY);
          return <Component />;
        } catch (error) {
          console.log(error);
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
