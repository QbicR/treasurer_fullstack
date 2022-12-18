import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import userServive from "../services/user.service";

const initialState = localStorage.getItem('token') ? {
    entity: null,
    isLoggedIn: true,
    isLoading: true,
    error: null,
    dataLoaded: false,
    auth: null
} : {
    entity: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    dataLoaded: false,
    auth: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true
        },
        userRecived: (state, action) => {
            state.entity = action.payload
            state.isLoading = false
            state.dataLoaded = false
        },
        userRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = true
        },
        userUpdatedSuccess: (state, action) => {
            state.entity = action.payload
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailer: (state, action) => {
            state.error = action.payload
        },
        userLoggedOut: (state) => {
            state.entity = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        }
    }
})

const { reducer: userReducer, actions } = userSlice
const {
    userRequested,
    userRecived,
    userRequestFiled,
    userUpdatedSuccess,
    authRequestSuccess,
    authRequestFailer,
    userLoggedOut
} = actions

const authRequested = createAction('user/authRequested')
const userUpdateRequested = createAction('user/userUpdateRequested')
const userUpdateFailed = createAction('user/userUpdateFailed')

export const loadUser = (userId) => async (dispatch) => {
    dispatch(userRequested())
    try {
        const data = await userServive.getUser(userId)
        dispatch(userRecived(data))
    } catch (error) {
        dispatch(userRequestFiled(error.message))
    }
}

export const updateUser = (userId, img) => async (dispatch) => {
    dispatch(userUpdateRequested())
    try {
        const data = await userServive.updateUser(userId, img)
        dispatch(userUpdatedSuccess(data))
    } catch (error) {
        dispatch(userUpdateFailed(error.message))
    }
}

export const logIn = (login, password) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.logIn(login, password)
        dispatch(authRequestSuccess(data.userId))
    } catch (error) {
        if (error.response === undefined) {
            alert('Сервер временно не работает. Попробуйте позже')
        }
        alert(error.response.data.message)
        dispatch(authRequestFailer(error.response.data.message))
    }
}

export const signUp = (login, nickName, password) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.registration(login, nickName, password)
        dispatch(authRequestSuccess(data.userId))
    } catch (error) {
        alert(error.response.data.message)
        dispatch(authRequestFailer(error.response.data.message))
    }
}

export const logOut = () => (dispatch) => {
    dispatch(userLoggedOut())
}

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getUserInfo = () => (state) => state.user.entity

export default userReducer