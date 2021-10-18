import userApi from "api/user";
import Login from "features/auth/login/Login";
import Register from "features/auth/register/Register";
import Home from "features/home/Home";
import Messenger from "features/messenger/Messenger";
import Profile from "features/profile/Profile";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useSelector((state) => state.user);

  window.addEventListener("beforeunload", async () => {
    userApi.update(user._id, { isOnline: false });
  });

  const isOnline = window.navigator.onLine;

  useEffect(() => {
    const updateOnline = async (userId) => {
      userApi.update(userId, { isOnline: isOnline });
    };
    user._id && updateOnline(user._id);
  }, [isOnline, user._id]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/messenger" exact component={Messenger} />
          <Route path="/profile/:userId" exact component={Profile} />
        </Switch>
      </BrowserRouter>

      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
