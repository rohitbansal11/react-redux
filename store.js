import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers //
import {
    adminDetailReducer,
    userDetailReducer,
    userLoginReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
    adminReducer: adminDetailReducer,
    userReduer: userDetailReducer,
    userLogin: userLoginReducer,
});

// get user from localstorage //
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;