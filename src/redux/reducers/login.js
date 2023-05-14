import {Actions} from "../actions/index.js";

const initialState = {
  token: localStorage.getItem('token') || null,
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.USER_LOGIN_SUCCESS:
      const token = action.payload;
      localStorage.setItem('token', token);
      return { ...state, token };
    default:
      return { ...state };
  }
}
export default loginReducer;
