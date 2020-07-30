import {authAPI} from "../components/api/signInApi";

const SET_USER_DATA = 'SET_USER_DATA';

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


const signInReducer = (state = initialState, action: any) => {
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

export const setAuthUserDataSuccess = (data: initialStateType) => ({
    type: SET_USER_DATA,
    authUserData: data
});

export const signIn = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let data = await authAPI.signIn(email, password, rememberMe);
    if (data.success) {
        dispatch(setAuthUserDataSuccess(data))
    }
};

export const signOut = () => async (dispatch: any) => {
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


export default signInReducer;