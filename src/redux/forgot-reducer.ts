import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";
import {forgotPageAPI} from "../api/forgot-page";

//State
let initialState = {
    success: false,
    errorMessage: "",
    testEmail: "test@gmail.com"
}

//Reducer
export const forgotReducer = (state: InitialState = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'FORGOTPAGE/CHANGE_PASSWORD_SUCCESS': {
            return {
                ...state,
                success: action.success
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
        dispatch(setChangePasswordSuccess(data.success))
    } catch (e) {
        let error = e.response.data.error;
        dispatch(setChangePasswordError(error));
        console.log(e.message)
    }
}

type ActionsType = setChangePasswordSuccessType | setChangePasswordErrorType
type InitialState = typeof initialState
type ThunkType = ThunkAction<Promise<void>, RootState, {}, ActionsType>
