export type cardPackType = {
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
};

export type addCardPackType = {
    name?: string;
    path?: string;
    grade?: number;
    shots?: number;
    rating?: number;
    deckCover?: string;
    private?: boolean;
    type?: string;
};

export type cardPacksDataType = {
    cardPacks: Array<cardPackType>;
    cardPacksTotalCount: number;
    page: number;
    pageCount: number;
    sortPacks: number;
};

export type packsGetDataType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: number,
    page?: number,
    pageCount?: number,
    user_id?: number
};


export type recordType = {
    key: string;
    name: string;
    grade: string;
    userId: string;
    cardPackId: string;
}