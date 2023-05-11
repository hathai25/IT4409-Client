import loginReducer from "./login.js";
import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "./user.js";

const rootReducer = combineReducers({
  loginUser: loginReducer,
  userInfo: userReducer,
});

export default rootReducer;