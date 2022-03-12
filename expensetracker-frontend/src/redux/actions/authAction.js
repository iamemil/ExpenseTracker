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
