import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./store";
import {packsAPI} from "../api/packsApi";
import saveTokenInCookie from '../utils/CookieToken/SaveTokenCookie'
import {cardPackType, cardPacksDataType, packsGetDataType, addCardPackType} from "../utils/Types/PacksTypes/PacksTypes";

const SET_CARD_PACKS = 'packsReducer/SET_CARD_PACKS';
const IS_FETCHING = 'packsReducer/IS_FETCHING';
const PACKS_TOGGLE = 'packsReducer/PACKS_TOGGLE';
const SET_CARD_PACKS_ERROR = 'packsReducer/SET_CARD_PACKS_ERROR';

const initialState = {
    cardPacks: [] as (Array<cardPackType>),
    cardPacksTotalCount: 0,
    page: 1,
    pageCount: 10,
    sortPacks: 1,
    isFetching: false,
    packsToggle: false,
    errorMessage: "",
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
        case SET_CARD_PACKS_ERROR: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case PACKS_TOGGLE: {
            return {
                ...state,
                packsToggle: action.packsToggle
            }
        }
        default:
            return state;
    }
};

//Actions
export const actions = {
    setCardPacksSuccess: (cardPacksData: cardPacksDataType) => ({
        type: SET_CARD_PACKS,
        payload: {...cardPacksData}
    } as const),
    setCardPacksSuccessError: (errorMessage: string) => ({
        type: SET_CARD_PACKS_ERROR,
        errorMessage
    } as const),
    packsToggleSuccess: (packsToggle: boolean) => ({
        type: PACKS_TOGGLE,
        packsToggle
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

    const token = await saveTokenInCookie.get('auth_token');

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

    await dispatch(actions.isFetchingSuccess(true));
    try {
        const cardPacksData = await packsAPI.getCardPacks(resultPacksQueryParams);
        const {cardPacks, cardPacksTotalCount, page, pageCount, token} = cardPacksData;
        await saveTokenInCookie.set('auth_token', token);
        await dispatch(actions.setCardPacksSuccess({cardPacks, cardPacksTotalCount, page, pageCount, sortPacks}));
        await dispatch(actions.setCardPacksSuccessError(''));
    } catch (e) {
        console.log(e.response);
        await dispatch(actions.setCardPacksSuccessError(e.response.data.error));
    }
    await dispatch(actions.isFetchingSuccess(false));
};

export const addUpdatePackThunk = (packsGetData: packsGetDataType,
                                   newCardPackData: addCardPackType,
                                   cardPackId: string | null,
                                   actionName: string): ThunkType => async (dispatch) => {

    const token = await saveTokenInCookie.get('auth_token');
    await dispatch(actions.isFetchingSuccess(true));
    try {
        if (actionName === 'Create') {
            const createdCardPackData = await packsAPI.addCardPack(newCardPackData, token);
            await saveTokenInCookie.set('auth_token', createdCardPackData.token);
        } else if (actionName === 'Update') {
            const createdCardPackData = await packsAPI.updateCardPack({_id: cardPackId, ...newCardPackData}, token);
            await saveTokenInCookie.set('auth_token', createdCardPackData.token);
        } else {
            console.log('addUpdatePackThunk Error!');
        }
        await dispatch(setPacksThunk(packsGetData));
    } catch (e) {
        console.log(e.response);
    }
    await dispatch(actions.isFetchingSuccess(false));
}

export const deleteCardPackThunk = (packsGetData: packsGetDataType, userId: string): ThunkType => async (dispatch) => {

    const token = await saveTokenInCookie.get('auth_token');
    await dispatch(actions.isFetchingSuccess(true));
    try {
        const deletedCardPackData = await packsAPI.deleteCardPack(userId, token);
        await saveTokenInCookie.set('auth_token', deletedCardPackData.token);
        await dispatch(setPacksThunk(packsGetData));
    } catch (e) {
        console.log(e.response);
    }
    await dispatch(actions.isFetchingSuccess(false));
}

//Types
export type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>