import axios from "axios";
import saveTokenInCookie from "../utils/CookieToken/SaveTokenCookie";

const instance = axios.create({
    // baseURL: "http://localhost:7542/1.0/",
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

type cardPack = {
    cardsCount: number;
    created: string;
    grade: number;
    name: string;
    path: string;
    private: boolean;
    rating: number;
    shots: number;
    type: string;
    updated: string;
    user_id: string;
    user_name: string;
    __v: number;
    _id: string;
}

type ResponseType = {
    cardPacks: Array<cardPack>;
    cardPacksTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    token: string;
    tokenDeathTime: number;
};

export const packsAPI = {
    getPacks: (getPacksQueryParams: any):any => {
        console.log(saveTokenInCookie.get('auth_token'));
        debugger
        return instance.get<ResponseType>(`cards/pack${getPacksQueryParams}`)
            .then(res => {
                return res.data;
            })
            .catch(e => {
                return e;
            })
    }
};