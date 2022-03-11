import * as AUTH_CONSTANTS from "../constants";

const authReducer = (state = { ...AUTH_CONSTANTS.authState }, action) => {
  if (action.type === AUTH_CONSTANTS.SUCCESSFULL_LOGIN) {
    return {
      isLoggedIn: true
    };
  }
  else if (action.type === AUTH_CONSTANTS.SUCCESSFULL_LOGOUT) {
    return {
      isLoggedIn: false
    };
  }
  return state;
};

export default authReducer;