import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {registerReducer} from "./register-reducer";

const rootReducer = combineReducers({
//reducers
    register: registerReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));