import axios from "axios";
import { cardPack } from "../utils/Types/PacksTypes/PacksTypes";

const instance = axios.create({
    // baseURL: "http://localhost:7542/1.0/",
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

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
    getCardPacks: (getPacksQueryParams: string) => {
        return instance.get<ResponseType>(`cards/pack${getPacksQueryParams}`)
            .then(res => res.data)
    }
};