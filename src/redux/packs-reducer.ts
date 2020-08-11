import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./store";
import {packsAPI} from "../api/packsApi";
import saveTokenInCookie from '../utils/CookieToken/SaveTokenCookie'
import {cardPackType, cardPacksDataType, packsGetDataType, addCardPackType} from "../utils/Types/PacksTypes/PacksTypes";

const SET_CARD_PACKS = 'packsReducer/SET_CARD_PACKS';
const IS_FETCHING = 'packsReducer/IS_FETCHING';


const initialState = {
    cardPacks: [] as (Array<cardPackType>),
    cardPacksTotalCount: null as (number | null),
    page: 1,
    pageCount: 10,
    sortPacks: 0,
    isFetching: false
};

//Reducers

export const packsReducer = (state: InitialStateType = initialState, action: ActionTypes) => {

    switch (action.type) {

        case SET_CARD_PACKS: {
            return {
                ...state,
                ...action.payload,
                cardPacks: [...action.payload.cardPacks]
            }
        }

        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        default:
            return state;
    }
};


//Actions

const actions = {
    setCardPacksSuccess: (cardPacksData: cardPacksDataType) => ({
        type: SET_CARD_PACKS,
        payload: {...cardPacksData}
    } as const),
    isFetchingSuccess: (isFetching: boolean) => ({
        type: IS_FETCHING,
        isFetching
    } as const),
}

//Thunks

export const setPacksThunk = (packsGetData: packsGetDataType): ThunkType => async (dispatch) => {

    const {
        packName = null,
        min = null,
        max = null,
        sortPacks = 1,
        page = 1,
        pageCount = 10,
        user_id = null
    } = packsGetData;


    const token = saveTokenInCookie.get('auth_token');

    const packsQueryParamsArr = ['?'];

    packName && packsQueryParamsArr.push(`packName=${packName}`);
    min && packsQueryParamsArr.push(`min=${min}`);
    max && packsQueryParamsArr.push(`max=${max}`);
    (sortPacks === 1 || sortPacks === 0) && packsQueryParamsArr.push(`sortPacks=${sortPacks}grade`);
    page && packsQueryParamsArr.push(`page=${page}`);
    pageCount && packsQueryParamsArr.push(`pageCount=${pageCount}`);
    token && packsQueryParamsArr.push(`token=${token}`);
    user_id && packsQueryParamsArr.push(`user_id=${user_id}`);

    const resultPacksQueryParams = packsQueryParamsArr.join('&').replace(/\?&/, '?');

    try {
        dispatch(actions.isFetchingSuccess(true));
        const cardPacksData = await packsAPI.getCardPacks(resultPacksQueryParams);
        const {cardPacks, cardPacksTotalCount, page, pageCount, token} = cardPacksData;
        saveTokenInCookie.set('auth_token', token);
        await dispatch(actions.setCardPacksSuccess({cardPacks, cardPacksTotalCount, page, pageCount}));
        dispatch(actions.isFetchingSuccess(false));
    } catch (e) {
        console.log(e);
    }

};

export const addNewPackThunk = (newCardPackData: addCardPackType): ThunkType => async (dispatch) => {

    const token = saveTokenInCookie.get('auth_token');

    try {
        dispatch(actions.isFetchingSuccess(true));

        const createdCardPackData = await packsAPI.addCardPack(newCardPackData, token);

        saveTokenInCookie.set('auth_token', createdCardPackData.token);
        await dispatch(setPacksThunk({}));
        dispatch(actions.isFetchingSuccess(false));
    } catch (e) {
        console.log(e);
    }
}

export const deleteCardPackThunk = (userId: string): ThunkType => async (dispatch) => {

    const token = saveTokenInCookie.get('auth_token');

    try {
        dispatch(actions.isFetchingSuccess(true));

        const deletedCardPackData = await packsAPI.deleteCardPack(userId, token);

        saveTokenInCookie.set('auth_token', deletedCardPackData.token);
        await dispatch(setPacksThunk({}));
        dispatch(actions.isFetchingSuccess(false));
    } catch (e) {
        console.log(e);
    }
}


//Types
type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>