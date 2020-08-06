export type cardPack = {
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

export type cardPacksDataType = {
    cardPacks: Array<cardPack>;
    cardPacksTotalCount: number;
    page: number;
    pageCount: number;
}

export type packsGetDataType = {
    packName?: string | null,
    min?: number | null,
    max?: number | null,
    sortPacks?: number,
    page?: number | null,
    pageCount?: number | null,
    user_id?: number | null
}