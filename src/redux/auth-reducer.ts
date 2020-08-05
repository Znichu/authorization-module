import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"
import {authAPI} from "../api/signInApi";

let initialState = {
    _id: null as (string | null),
    email: null as (null | string),
    name: null as (null | string),
    isAdmin: null as (null | boolean),
    publicCardPacksCount: null as (null | number),
    isAuth: false
}

//Reducer
export const AuthReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "AUTH/SET_AUTH_DATA": {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}

//Action
const actions = {
    setAuthData: (_id: null | string, email: null | string, name: null | string,
                  isAdmin: null | boolean, publicCardPacksCount: null | number, isAuth: boolean) => ({
        type: "AUTH/SET_AUTH_DATA",
        payload: {
            _id, email, name, isAdmin, publicCardPacksCount, isAuth
        }
    } as const)
}
//Thunk
export const getAuthData = (): ThunkType => async (dispatch) => {
    try {
        const token = saveTokenInCookie.get('auth_token');
        let data = await authAPI.getAuth(token)
        saveTokenInCookie.set('auth_token', data.token);
        let {_id, email, name, isAdmin, publicCardPacksCount} = data;
        dispatch(actions.setAuthData(_id, email, name, isAdmin, publicCardPacksCount,true))
    } catch (e) {
        console.log(e.message)

    }
}

//Types
type InitialState = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, {}, ActionsType>