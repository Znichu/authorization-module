import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./store";
import {forgotPageAPI} from "../api/forgot-page";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"

//State
let initialState = {
    success: false,
    errorMessage: "",
    isFetching: false,
}

//Reducer
export const forgotReducer = (state: InitialState = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'FORGOTPAGE/CHANGE_PASSWORD_SUCCESS': {
            return {
                ...state,
                success: action.success,
            }
        }
        case 'FORGOTPAGE/CHANGE_PASSWORD_ERROR': {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        case "FORGOTPAGE/TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state
    }
}

//Action
const action = {
    setChangePasswordSuccess: (success: boolean) => ({
        type: 'FORGOTPAGE/CHANGE_PASSWORD_SUCCESS',
        success
    } as const ),
    setChangePasswordError: (errorMessage: string) => ({
        type: 'FORGOTPAGE/CHANGE_PASSWORD_ERROR',
        errorMessage
    } as const ),
    toggleIsFetching: (isFetching: boolean) => ({type: "FORGOTPAGE/TOGGLE_IS_FETCHING", isFetching} as const )
}

//Thunk
export const changePassword = (email: string): ThunkType => async (dispatch) => {
    try {
        dispatch(action.toggleIsFetching(true));
        dispatch(action.setChangePasswordError(""));
        let data = await forgotPageAPI.forgot(email);
        let result = data.html.match(/(.*)set-new-password'(.*?)>(.*)/);
        const resetPasswordToken = result[2];
        saveTokenInCookie.set('resetPasswordToken', resetPasswordToken);
        dispatch(action.setChangePasswordSuccess(data.success))
    } catch (e) {
        dispatch(action.setChangePasswordError(e.response.data.error));
        console.log(e.message)
    }
    dispatch(action.toggleIsFetching(false))
}

//Types
type ActionTypes = InferActionTypes <typeof action>
type InitialState = typeof initialState
type ThunkType = ThunkAction<Promise<void>, AppStateType, {}, ActionTypes>
