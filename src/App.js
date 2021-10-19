import ProtectedRoute from "components/protectedRoute/ProtectedRoute";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  // const { user } = useSelector((state) => state.user);

  // window.addEventListener("beforeunload", async () => {
  //   userApi.update(user._id, { isOnline: false });
  // });

  // const isOnline = window.navigator.onLine;

  // useEffect(() => {
  //   const updateOnline = async (userId) => {
  //     userApi.update(userId, { isOnline: isOnline });
  //   };
  //   user._id && updateOnline(user._id);
  // }, [isOnline, user._id]);

  const Register = React.lazy(() => import("features/auth/register/Register"));
  const Login = React.lazy(() => import("features/auth/login/Login"));
  const Home = React.lazy(() => import("features/home/Home"));
  const Profile = React.lazy(() => import("features/profile/Profile"));
  const Messenger = React.lazy(() => import("features/messenger/Messenger"));

  return (
    <div className="App">
      <Suspense fallback={<LinearProgress />}>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <ProtectedRoute path="/messenger" exact component={Messenger} />
            <ProtectedRoute path="/profile/:userId" exact component={Profile} />
          </Switch>
        </BrowserRouter>
        <ToastContainer theme="dark" />
      </Suspense>
    </div>
  );
}

export default App;
