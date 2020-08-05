import {authAPI} from '../api/signInApi';
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./store";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"
import {getAuthData} from "./auth-reducer";

type ThunkType = ThunkAction<void, AppStateType, {}, ActionType>
type ActionType = InferActionTypes<typeof actions>
type initialStateType = typeof initialState

const initialState = {
    _id: null as (null | string),
    email: null as (null | string),
    success: false,
    isFetching: false,
    errorMessage: ''
};


//reducer
const signInReducer = (state: initialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "SIGNIN/SET_USER_DATA": {
            return {
                ...state,
                ...action.payload
            }
        }
        case "SIGNIN/TOGGLE_IS_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "SIGNIN/SET_MESSAGE_ERROR": {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        default:
            return state;
    }
};



//action
export const actions = {
    setAuthUserDataSuccess: (_id: string, email: string, success: boolean) => ({type: "SIGNIN/SET_USER_DATA", payload: {_id, email, success}} as const),
    setAuthUserDataError: ( errorMessage: string) => ({type: "SIGNIN/SET_MESSAGE_ERROR", errorMessage} as const ),
    toggleIsFetching: (isFetching: boolean) => ({type: "SIGNIN/TOGGLE_IS_FETCHING", isFetching} as const )
}

//thunk to login
export const signIn = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setAuthUserDataError(""));
        let data = await authAPI.signIn(email, password, rememberMe);
        saveTokenInCookie.set('auth_token', data.token);
        dispatch(actions.setAuthUserDataSuccess(data._id, data.email, data.success));
        dispatch(getAuthData());
    } catch (e) {
        dispatch(actions.setAuthUserDataError(e.response.data.error));
        console.log(e.message)
    }
    dispatch(actions.toggleIsFetching(false));
};

export default signInReducer;
