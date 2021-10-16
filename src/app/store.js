import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "../features/auth/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
