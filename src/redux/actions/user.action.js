import actions from "./action.type.js";

export const getUserInfo = (payload) => ({
  type: actions.GET_USER_INFO,
  payload,
});