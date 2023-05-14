import actions from "./action.type.js";

export const getUserCartSuccess = (payload) => ({
  type: actions.GET_USER_CART_SUCCESS,
  payload,
});