import * as AUTH_CONSTANTS from "../constants";

export const loginSuccessfull = () => {
    return {
        type : AUTH_CONSTANTS.SUCCESSFULL_LOGIN
    }
}

export const logoutSuccessfull = () => {
    return {
        type : AUTH_CONSTANTS.SUCCESSFULL_LOGOUT
    }
}

export const newReceiptAdded = () => {
    return {
        type : AUTH_CONSTANTS.RECEIPT_ADDED
    }
}

export const newReceiptNotAdded = () => {
    return {
        type : AUTH_CONSTANTS.RECEIPT_NOT_ADDED
    }
}

