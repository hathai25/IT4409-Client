import {Actions} from "../actions/index.js";

const initialState = {
  userId: JSON.parse(localStorage.getItem('userInfo'))?.userId || null,
  avatar: JSON.parse(localStorage.getItem('userInfo'))?.avatar || null,
  email: JSON.parse(localStorage.getItem('userInfo'))?.email || null,
  username: JSON.parse(localStorage.getItem('userInfo'))?.username || null,
  productCart: []
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER_INFO:
      const { username, userId, avatar, email } = action.payload;
      return { ...state, username, avatar, userId, email };
    default:
      return { ...state };
  }
}

export default userReducer;