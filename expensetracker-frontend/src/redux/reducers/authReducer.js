import * as AUTH_CONSTANTS from "../constants";


const authState = {
  isLoggedIn: false,
  receiptDataModified: false
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
  else if (action.type === AUTH_CONSTANTS.RECEIPT_DATA_MODIFIED) {
    return {
      ...state,
      receiptDataModified: true
    };
  }
  else if (action.type === AUTH_CONSTANTS.RECEIPT_DATA_NOT_MODIFIED) {
    return {
      ...state,
      receiptDataModified: false
    };
  }
  return state;
};

export default authReducer;