import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {resetPasswordApi} from "../api/resetPasswordApi";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"

let initialState = {
    success: false,
    errorMessage: "",
    isFetching: false
}

//Reducer
export const SetNewPassReducer = (state: InitialState = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "RESET/SET_NEW_PASS_SUCCESS": {
            return {
                ...state,
                success: action.success
            }
        }
        case "RESET/SET_NEW_PASS_ERROR": {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case "RESET/TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state
    }
}

//Actions
const actions = {
    setNewPassSuccess: (success: boolean) => ({type: "RESET/SET_NEW_PASS_SUCCESS", success} as const),
    setNewPassError: (message: string) => ({type: "RESET/SET_NEW_PASS_ERROR", message} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "RESET/TOGGLE_IS_FETCHING", isFetching} as const )
}

//Thunk
export const resetPassword = (password: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true))
        const resetPasswordToken = saveTokenInCookie.get('resetPasswordToken');
        let data = await resetPasswordApi.resetPassword(resetPasswordToken, password);
        dispatch(actions.setNewPassSuccess(data))
    } catch (e) {
        dispatch(actions.setNewPassError(e.response.data.error));
        console.log(e.message)
    }
    dispatch(actions.toggleIsFetching(false))
}


//Types
type InitialState = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>