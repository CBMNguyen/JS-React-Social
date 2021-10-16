import Login from "features/auth/login/Login";
import Register from "features/auth/register/Register";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Login />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
