import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {AppStateType} from "./store";
import {packsAPI} from "../api/packsApi";
import saveTokenInCookie from '../utils/CookieToken/SaveTokenCookie'


// const SET_USER_DATA_SUCCESS = 'authorization-module-project/registerReducer/SET_USER_DATA_SUCCESS';

type cardPack = {
    cardsCount: number | null;
    created: string | null;
    grade: number | null;
    name: string | null;
    path: string | null;
    private: boolean;
    rating: number | null;
    shots: number | null;
    type: string | null;
    updated: string | null;
    user_id: string | null;
    user_name: string | null;
    __v: number | null;
    _id: string | null;
}

type initialState = {
    cardPacks: Array<cardPack>;
    cardPacksTotalCount: number | null;
    maxGrade: number | null;
    minGrade: number | null;
    page: number | null;
    pageCount: number | null;
    token: string | null;
    tokenDeathTime: number | null;
};

const initialState: initialState = {
    cardPacks: [],
    cardPacksTotalCount: null,
    maxGrade: null,
    minGrade: null,
    page: null,
    pageCount: null,
    token: null,
    tokenDeathTime: null,
};

export const packsReducer = (state: initialState = initialState, action: any) => {

    switch (action.type) {

        // case SET_USER_DATA_SUCCESS: {
        //     return {
        //         ...state,
        //
        //     };
        // }

        default:
            return state;
    }
};

//Actions
// type InferPacksActionTypes<T> = T extends {[key: string]: infer U} ? U : never;
// type PacksActionTypes = ReturnType<InferPacksActionTypes<typeof actions>>

const actions = {
    // registerUserDataSuccess : (userData: initialState) => ({type: SET_USER_DATA_SUCCESS, payload: {...userData}} as const),
}

//Thunks
// type ThunkType = ThunkAction<void, AppStateType, {}, PacksActionTypes>
// type ThunkDispatchType = ThunkDispatch<AppStateType, {}, PacksActionTypes>

export const getPacksThunk = (packsGetData: any): any => async (dispatch: any) => {

    let {
        packName = null,
        min = null,
        max = null,
        sortPacks = null,
        page = null,
        pageCount = null,
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

    const resultPacksQueryParams = packsQueryParamsArr.length === 1 ? '' : packsQueryParamsArr.join('&').replace(/\?&/, '?');

    try {
        const data = await packsAPI.getPacks(resultPacksQueryParams);
        saveTokenInCookie.set('auth_token', data.token);
    } catch (e) {
        console.log(e);
    }

};