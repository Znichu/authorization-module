import {AppStateType, InferActionTypes} from "./store";
import { ThunkAction } from "redux-thunk";
import {getAuthData} from "./profile-reducer";

let initialState  =  {
    initialize: false
}

//Reducer
export const InitializeApp = (state: InitialState = initialState, action: ActionTypes ) => {
    switch (action.type) {
        case "APP/SET_INITIALIZE_APP": {
            return {
                ...state,
                initialize: true
            }
        }
        default:
            return state
    }
}

//Action
const action = {
    setInitializeApp: () => ({type: 'APP/SET_INITIALIZE_APP'} as const )
}

//Thunk

export const getInitializeApp = (): ThunkType => async (dispatch) => {
    try {
        let authPromise =  await dispatch(getAuthData());
        Promise.all([authPromise])
            .then(
                () => dispatch(action.setInitializeApp())
            )
    } catch (e) {
        console.log(e.message)
    }
}

//Type
type ThunkType = ThunkAction<Promise<void>, AppStateType, {}, ActionTypes>
type InitialState = typeof initialState
type ActionTypes = InferActionTypes<typeof action>