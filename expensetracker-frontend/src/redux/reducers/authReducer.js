import * as AUTH_CONSTANTS from "../constants";


const authState = {
  isLoggedIn: false,
  newReceiptAdded: false
};
const authReducer = (state = { ...authState }, action) => {
  if (action.type === AUTH_CONSTANTS.SUCCESSFULL_LOGIN) {
    return {
      ...state,
      isLoggedIn: true
    };
  }
  else if (action.type === AUTH_CONSTANTS.SUCCESSFULL_LOGOUT) {
    return {
      ...state,
      isLoggedIn: false
    };
  }
  else if (action.type === AUTH_CONSTANTS.RECEIPT_ADDED) {
    return {
      ...state,
      newReceiptAdded: true
    };
  }
  else if (action.type === AUTH_CONSTANTS.RECEIPT_NOT_ADDED) {
    return {
      ...state,
      newReceiptAdded: false
    };
  }
  return state;
};

export default authReducer;