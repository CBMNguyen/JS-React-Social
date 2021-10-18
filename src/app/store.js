import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "../features/auth/userSlice";
import postReducer from "./postSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
