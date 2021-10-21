import ProtectedRoute from "components/protectedRoute/ProtectedRoute";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import NotFound from "./components/notFound/NotFound";

function App() {
  const Register = React.lazy(() => import("features/auth/register/Register"));
  const Login = React.lazy(() => import("features/auth/login/Login"));
  const Home = React.lazy(() => import("features/home/Home"));
  const Profile = React.lazy(() => import("features/profile/Profile"));

  return (
    <div className="App">
      <Suspense fallback={<LinearProgress />}>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/profile/:userId" exact component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        <ToastContainer theme="dark" />
      </Suspense>
    </div>
  );
}

export default App;
