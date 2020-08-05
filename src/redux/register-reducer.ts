import {registerAPI} from "../api/registerApi";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppStateType} from "./store";

const SET_USER_DATA_SUCCESS = 'authorization-module-project/registerReducer/SET_USER_DATA_SUCCESS';

type addedUser = {
    created: string | null,
    email: string | null,
    isAdmin: boolean,
    name: string | null,
    publicCardPacksCount: number | null,
    rememberMe: boolean,
    updated: string | null,
    verified: boolean,
    __v: number | null,
    _id: string | null,
}

type initialState = {
    addedUser: addedUser,
    success: boolean
};

const initialState: initialState = {
    addedUser: {
        created: null,
        email: null,
        isAdmin: false,
        name: null,
        publicCardPacksCount: null,
        rememberMe: false,
        updated: null,
        verified: false,
        __v: null,
        _id: null,
    },
    success: false
};

export const registerReducer = (state: initialState = initialState, action: registerActionTypes) => {

    switch (action.type) {

        case SET_USER_DATA_SUCCESS: {
            return {
                ...state,
                addedUser: {...action.payload.addedUser},
                success: action.payload.success
            };
        }

        default:
            return state;
    }
};

//Actions
type InferRegisterActionTypes<T> = T extends {[key: string]: infer U} ? U : never;
type registerActionTypes = ReturnType<InferRegisterActionTypes<typeof actions>>

const actions = {
    registerUserDataSuccess : (userData: initialState) => ({type: SET_USER_DATA_SUCCESS, payload: {...userData}} as const),
}

//Thunks
type ThunkType = ThunkAction<void, AppStateType, {}, registerActionTypes>
type ThunkDispatchType = ThunkDispatch<AppStateType, {}, registerActionTypes>

export const userRegisteration = (email: string, password: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        const data = await registerAPI.register(email, password);
        dispatch(actions.registerUserDataSuccess(data))
    } catch (e) {
        console.log(e);
    }

};
