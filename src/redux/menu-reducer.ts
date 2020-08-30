import {InferActionTypes} from "./store";

let initialState = {
    selectedKey: ' '
}
//Reducer
export const MenuReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "CARDS/MENU/SET_SELECTED_KEY": {
            return {
                ...state,
                selectedKey: action.key
            }
        }
        default:
            return state
    }
}
//Action
export const action = {
    setSelectedKey: (key: string) => ({type: 'CARDS/MENU/SET_SELECTED_KEY', key})
}
//Type
type ActionType = InferActionTypes<typeof action>
type InitialStateType = typeof initialState