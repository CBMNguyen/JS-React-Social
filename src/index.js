import store, { persistor } from "app/store";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import LinearProgress from "@mui/material/LinearProgress";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LinearProgress />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
