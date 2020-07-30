const SET_USER_DATA = 'SET_USER_DATA';


type initialStateType = {
    email: string | null
    name: string | null
    password: string | null
    rememberMe: boolean
    isAdmin: boolean
    success: boolean
    token: string | null
    message: string
};

const initialState: initialStateType = {
    email: null,
    name: null,
    password: null,
    rememberMe: false,
    isAdmin: false,
    success: false,
    token: '',
    message: 'hello world'
};


const signInReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

export const setAuthUserDataSuccess = (email: string, isAdmin: boolean, success: boolean, token: string) => ({
    type: SET_USER_DATA,
    payload: {email, isAdmin, success, token}
});


export default signInReducer;