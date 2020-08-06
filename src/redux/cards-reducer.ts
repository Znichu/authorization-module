import {cardsApi} from '../api/cardsApi';
import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionTypes} from "./store";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie"


//Types
type ActionTypes = InferActionTypes<typeof action>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>


type Card = {
    answer: string | null
    question: string | null
    cardsPack_id: string | null
    grade: number | null
    rating: number | null
    shots: number | null
    type: string | null
    created: string | null
    updated: string | null
    __v: number | null
    _id: string | null
}


const initialState = {
    cards: [] as Array<Card>,
    cardsTotalCount: 0,
    page: 1,
    pageCount: 10,
    sortCards: 0,
    errorMessage: ""
};

type InitialStateType = typeof initialState;

const cardsReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'SET_USER_CARDS': {
            return {
                ...state,
                ...action.cards
            }
        }
        case 'SET_ERROR_MESSAGE': {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        default:
            return state
    }
};

const action = {
    setUserCardsSuccess: (cards: Array<Card>) => ({
        type: 'SET_USER_CARDS',
        cards
    } as const),
    setUserCardsError: (errorMessage: string) => ({
        type: 'SET_ERROR_MESSAGE',
        errorMessage
    } as const)
};

export const setCards = (): ThunkType => async (dispatch, getState) => {
    try {
        const token = saveTokenInCookie.get("auth_token");
        let {sortCards, page, pageCount} = getState().cardsReducer;
        let data = await cardsApi.getCards('5f2c540aaf0190000481bc95', sortCards, page, pageCount, token);
        dispatch(action.setUserCardsSuccess(data))
    } catch (e) {
        dispatch(action.setUserCardsError(e.respone.data.error));
        console.log(e.message)
    }
};


export default cardsReducer;