import LinearProgress from "@mui/material/LinearProgress";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import userApi from "api/user";
import ProtectedRoute from "components/protectedRoute/ProtectedRoute";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import NotFound from "./components/notFound/NotFound";

window.addEventListener("beforeunload", async () => {
  const user = JSON.parse(localStorage.getItem("persist:facebook")).user;
  const userId = JSON.parse(user).user._id;
  if (userId) userApi.update(userId, { latestOnline: new Date() });
});

function App() {
  const Register = React.lazy(() => import("features/auth/register/Register"));
  const Login = React.lazy(() => import("features/auth/login/Login"));
  const Home = React.lazy(() => import("features/home/Home"));
  const Profile = React.lazy(() => import("features/profile/Profile"));

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_WS_URL));
  }, []);

  return (
    <div className="App">
      <ScopedCssBaseline>
        <Suspense fallback={<LinearProgress />}>
          <BrowserRouter>
            <Switch>
              <ProtectedRoute path="/" exact>
                <Home socket={socket} />
              </ProtectedRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <ProtectedRoute path="/profile/:userId" exact>
                <Profile socket={socket} />
              </ProtectedRoute>
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
          <ToastContainer theme="dark" />
        </Suspense>
      </ScopedCssBaseline>
    </div>
  );
}

export default App;
