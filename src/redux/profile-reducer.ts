import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"
import {authAPI} from "../api/signInApi";
import {ProfileType} from "../types/types";

let initialState = {
    profile: {
        _id: null as (string | null),
        email: null as (string | null),
        name: null as (string | null),
        avatar: null as (string | null),
        publicCardPacksCount: null as (number | null),
        isAdmin: null as (boolean | null),
        verified: null as (boolean | null),
    },
    isAuth: false
}

//Reducer
export const ProfileReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "USER_PROFILE/SET_PROFILE_DATA": {
            return {
                ...state,
                ...action.payload
            }
        }
        case "USER_PROFILE/SET_AUTH_VALUE": {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        default:
            return state
    }
}

//Action
export const actions = {
    setProfileData: (profile: ProfileType, isAuth: boolean) => ({
        type: "USER_PROFILE/SET_PROFILE_DATA",
        payload: {
            profile,
            isAuth
        }
    } as const),
    logoutFromProfile: (isAuth: boolean) => ({ type: 'USER_PROFILE/SET_AUTH_VALUE', isAuth } as const)
}

//Thunk
export const getAuthData = (): ThunkType => async (dispatch) => {
    try {
        const token = saveTokenInCookie.get('auth_token');
        let data = await authAPI.getAuth(token)
        saveTokenInCookie.set('auth_token', data.token);
        let {_id, email, isAdmin, name, verified, publicCardPacksCount, avatar} = data;
        dispatch(actions.setProfileData({_id, email, isAdmin, name, verified, publicCardPacksCount, avatar}, true));
    } catch (e) {
        console.log(e.message)

    }
}

//Types
type InitialState = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, {}, ActionsType>