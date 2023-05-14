import {Actions} from "../actions/index.js";

const initialState = {
  cart: [],
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER_CART_SUCCESS:
      const cart = action.payload;
      return { ...state, cart };
    default:
      return { ...state };
  }
}

export default cartReducer;