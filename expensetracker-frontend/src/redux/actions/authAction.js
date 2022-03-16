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

export const receiptDataModified = () => {
    return {
        type : AUTH_CONSTANTS.RECEIPT_DATA_MODIFIED
    }
}

export const receiptDataNotModified = () => {
    return {
        type : AUTH_CONSTANTS.RECEIPT_DATA_NOT_MODIFIED
    }
}

