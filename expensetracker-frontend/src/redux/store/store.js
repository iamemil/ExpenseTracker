import { createStore } from "redux";
import secureLs from "../../common/helper";
import authReducer from "../reducers/authReducer";
const configureStore = () => {

    const Auth = secureLs.get("auth");

    let authState = {
        isLoggedIn: false
    };
    if (Auth) {
        authState = Auth;
    }

    const store = createStore(
        authReducer,
        authState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(() => {
        secureLs.set("auth", store.getState())
    })

    return store;
};

export default configureStore;