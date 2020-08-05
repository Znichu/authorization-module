import {authAPI} from '../api/signInApi';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"

const SET_USER_DATA = 'SET_USER_DATA';

export type ThunkType = ThunkAction<void, AppStateType, {}, setAuthUserDataSuccessType>

type initialStateType = {
    _id: string | null
    email: string | null
    rememberMe: boolean
    isAdmin: boolean
    name: string | null
    verified: string | null
    publicCardPacksCount: number | null
    __v: number | null
    password: string | null
    token: string | null
    success: boolean
};

const initialState: initialStateType = {
    _id: null,
    email: null,
    rememberMe: false,
    isAdmin: false,
    name: null,
    verified: null,
    publicCardPacksCount: null,
    __v: null,
    password: null,
    token: null,
    success: false
};


//reducer
export const signInReducer = (state = initialState, action: setAuthUserDataSuccessType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.authUserData
            }
        }
        default:
            return state;
    }
};


//actionType
export type setAuthUserDataSuccessType = {
    type: typeof SET_USER_DATA,
    authUserData: initialStateType
}

//action
export const setAuthUserDataSuccess = (data: initialStateType): setAuthUserDataSuccessType => ({
    type: SET_USER_DATA,
    authUserData: data
});

//thunk to login
export const signIn = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    try {
        let data = await authAPI.signIn(email, password, rememberMe);
        saveTokenInCookie.set('auth_token', data.token);
        dispatch(setAuthUserDataSuccess(data))
    } catch (e) {
        console.log(e.message)
    }


};

//thunk to logout
export const signOut = (): ThunkType => async (dispatch) => {
    let data = await authAPI.signOut();
    if (data.success) {
        dispatch(setAuthUserDataSuccess({
            _id: null,
            email: null,
            rememberMe: false,
            isAdmin: false,
            name: null,
            verified: null,
            publicCardPacksCount: null,
            __v: null,
            password: null,
            token: null,
            success: false
        }))
    }
};


