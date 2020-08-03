import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {resetPasswordApi} from "../api/resetPasswordApi";

let initialState = {
    success: false,
    errorMessage: ""
}

//Reducer
export const SetNewPass = (state: InitialState = initialState, action: ActionTypes) => {
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
        default:
            return state
    }
}

//Actions
const actions = {
    setNewPassSuccess: (success: boolean) => ({type: "RESET/SET_NEW_PASS_SUCCESS", success} as const),
    setNewPassError: (message: string) => ({type: "RESET/SET_NEW_PASS_ERROR", message} as const)
}

//Thunk
export const resetPassword = (resetPasswordToken: string, password: string): ThunkType => async (dispatch) => {
    try {
        let data = await resetPasswordApi.resetPassword(resetPasswordToken, password);
        dispatch(actions.setNewPassSuccess(data))
    } catch (e) {
        dispatch(actions.setNewPassError(e.response.data.error));
        console.log(e.message)
    }
}


//Types
type InitialState = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>