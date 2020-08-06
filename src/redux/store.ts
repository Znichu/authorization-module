import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {forgotReducer} from "./forgot-reducer";
import { registerReducer } from "./register-reducer";
import signInReducer from "./sign-in-reducer";
import cardsReducer from "./cards-reducer";

const rootReducer = combineReducers({
    forgotPage: forgotReducer,
    register: registerReducer,
    singInReducer: signInReducer,
    cardsReducer : cardsReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
