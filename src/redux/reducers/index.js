import loginReducer from "./login.js";
import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "./user.js";
import cartReducer from "./cart.js";

const rootReducer = combineReducers({
  loginUser: loginReducer,
  userInfo: userReducer,
  userCart: cartReducer,
});

export default rootReducer;