import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import signInReducer from "./sign-in-reducer";

const rootReducer = combineReducers({
    singInReducer: signInReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppStateType = ReturnType<typeof rootReducer>

