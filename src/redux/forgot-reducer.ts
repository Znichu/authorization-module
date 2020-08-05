import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {forgotPageAPI} from "../api/forgot-page";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"

//State
let initialState = {
    success: false,
    errorMessage: "",
}

//Reducer
export const forgotReducer = (state: InitialState = initialState, action: ActionsType) => {
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
        default:
            return state
    }
}

//Action
type setChangePasswordSuccessType = {
    type: 'FORGOTPAGE/CHANGE_PASSWORD_SUCCESS'
    success: boolean
}
const setChangePasswordSuccess = (success: boolean): setChangePasswordSuccessType => ({
    type: 'FORGOTPAGE/CHANGE_PASSWORD_SUCCESS',
    success
});
type setChangePasswordErrorType = {
    type: 'FORGOTPAGE/CHANGE_PASSWORD_ERROR'
    errorMessage: string
}
const setChangePasswordError = (errorMessage: string): setChangePasswordErrorType => ({
    type: 'FORGOTPAGE/CHANGE_PASSWORD_ERROR',
    errorMessage
});

//Thunk
export const changePassword = (email: string): ThunkType => async (dispatch) => {
    try {
        let data = await forgotPageAPI.forgot(email);
        let result = data.html.match(/(.*)set-new-password'(.*?)>(.*)/);
        const resetPasswordToken = result[2];
        saveTokenInCookie.set('resetPasswordToken', resetPasswordToken);
        dispatch(setChangePasswordSuccess(data.success))
    } catch (e) {
        dispatch(setChangePasswordError(e.response.data.error));
        console.log(e.message)
    }
}

//Types
type ActionsType = setChangePasswordSuccessType | setChangePasswordErrorType
type InitialState = typeof initialState
type ThunkType = ThunkAction<Promise<void>, AppStateType, {}, ActionsType>
