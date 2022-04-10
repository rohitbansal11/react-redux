// import axios from "axios";
import swal from "sweetalert";
import axios from "../utils/apidsf";

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    GET_ALL_USER_ADMIN,
    GET_ALL_FILE_ADMIN,
    GENERATETOKEN,
} from "../constants/userConstants";
///////////////////////////////////////////////////////////////////////////
export const GetToken = () => async (dispatch) => {
    try {
        let loginData = {
            username: "admin",
            password: "Lexpedia@pass123",
        };
        let res = await axios.post(
            "http://lexpedia.masterdomain.in/wp-json/jwt-auth/v1/token",
            loginData
        );
        let ressecond = await axios.post(
            "http://assets.thelexpedia.com/wp-json/jwt-auth/v1/token",
            loginData
        );
        dispatch({
            type: GENERATETOKEN,
            payload: ressecond?.data?.token,
        });
    } catch (error) {
        console.log(error);
    }
};



/////////////////////////////////////////////////////////////////////////////////

///----------------- for Go to aother page------------------------------------------------------

//...............end................................................................

////////////////// User And admin action  are different

export const loginUser = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            `/api/users/login`,
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        // add user to local storage //
        // localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem(
            "userInfo",
            JSON.stringify(getState().userLogin.userInfo)
        );
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    window.location.assign("/");
};

export const userLogin = (data) => { };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////Only Admin Action

export const fileSave = (data) => (dispatch) => {
    let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    try {
        axios
            .post("/api/admin/file", data, config)
            .then((res) => {
                console.log(res.data);
                if (res.data?.massage) {
                    swal({
                        title: "Success",
                        text: res.data?.massage,
                        icon: "success",
                    });
                    window.location.href = "/admin/file";
                } else {
                    swal({
                        title: "Error",
                        text: "There is a error try again",
                        icon: "error",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
        swal({
            title: "Error",
            text: "There is a error try again",
            icon: "error",
        });
    }
};

export const allUser = () => (dispatch) => {
    let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    try {
        axios
            .get("/api/admin/user", config)
            .then((res) => {
                let data = res?.data?.map((w) => {
                    return {
                        id: w._id,
                        email: w.email,
                        name: w.name,
                        subscription: w.subscription,
                    };
                });

                dispatch({
                    type: GET_ALL_USER_ADMIN,
                    payload: data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};

export const updateUser = (data, id) => (dispatch) => {
    let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };
    try {
        axios
            .patch(`/api/admin/user/${id}`, data, config)
            .then((res) => {
                console.log(res.data);
                if (res?.data?.result) {
                    swal({
                        title: "Success",
                        text: res?.data?.massage,
                        icon: "success",
                    });
                    window.location.href = "/admin/user-list";
                } else {
                    swal({
                        title: "Error",
                        text: res?.data?.massage,
                        icon: "error",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};

export const allFile = () => (dispatch) => {
    let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    try {
        axios
            .get("/api/admin/file", config)
            .then((res) => {
                dispatch({
                    type: GET_ALL_FILE_ADMIN,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};

export const AdminAddUser = async (data) => {
    let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };
    await axios
        .post("/api/auth/admin/register", data, config)
        .then((res) => {
            console.log(res.data);
            if (res.data?.result) {
                swal({
                    title: "Success",
                    text: res.data?.massage,
                    icon: "success",
                });
                window.location.assign("/admin/user-list");
            } else {
                swal({
                    title: "Error",
                    text: res.data?.massage,
                    icon: "error",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            swal({
                title: "Error",
                text: "Something Went Wronge Please Refresh Page",
                icon: "error",
            });
        });
};