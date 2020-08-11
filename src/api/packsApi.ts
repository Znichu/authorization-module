import axios from "axios";
import { cardPackType } from "../utils/Types/PacksTypes/PacksTypes";

const instance = axios.create({
    baseURL: "http://localhost:7542/1.0/",
    // baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

type getCardPacksResponseType = {
    cardPacks: Array<cardPackType>;
    cardPacksTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    token: string;
    tokenDeathTime: number;
};

type CardPackResponseType = {
    newCardsPack: Array<cardPackType>;
    success: boolean,
    token: string,
    tokenDeathTime: number,
};

export const packsAPI = {
    getCardPacks: (getPacksQueryParams: string) => {
        return instance.get<getCardPacksResponseType>(`cards/pack${getPacksQueryParams}`)
            .then(res => res.data)
    },
    addCardPack: (cardsPack: any, token: string) => {
        return instance.post<CardPackResponseType>(`cards/pack`, {cardsPack: {...cardsPack}, token: token})
            .then(res => res.data)
    },
    deleteCardPack: (userId: string, token: string) => {
        return instance.delete<CardPackResponseType>(`cards/pack?id=${userId}&token=${token}`)
            .then(res => res.data)
    },
};

