import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_DETAILS_REQUEST,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LOGOUT,
    ALL_FIle_DATA_UPLODE,
    GET_ALL_USER_ADMIN,
    GET_ALL_FILE_ADMIN,
    GENERATETOKEN
} from "../constants/userConstants";

const intialValueAdmin = {
    token: '',

};
const intialValueUser = {};

export const userLoginReducer = (state = { user: {} }, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: payload,
            };
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const adminDetailReducer = (state = intialValueAdmin, action) => {
    const { type, payload } = action;
    switch (type) {
        case GENERATETOKEN:
            return {
                ...state,
                token: payload,
            };

        default:
            return state;
    }
};

export const userDetailReducer = (state = intialValueUser, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                userInfo: payload,
                success: true,
            };
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};