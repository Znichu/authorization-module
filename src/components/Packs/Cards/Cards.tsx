import * as React from 'react';
import {memo, ReactElement} from "react";
import {useRouteMatch, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";

export const Cards = memo((props): ReactElement => {

    const {
        packs: cardPacksData,
        singInReducer: {_id: authUserId}
    } = useSelector((state: AppStateType) => state);

    const match = useRouteMatch<MatchParams>('/pack/:packId');
    const packId = match?.params.packId as string;
    const cardPacksId = cardPacksData.cardPacks.map(pack => pack._id);

    return (
        authUserId && cardPacksId.includes(packId) ?
            <div className="Cards">
                Cards Pack id is equal - {packId}
            </div>
            : <Redirect to={'/sign-in'}/>
    )
})

//Types
type MatchParams = {
    packId: string;
}

