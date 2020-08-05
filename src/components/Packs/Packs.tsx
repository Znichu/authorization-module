import * as React from 'react';
import { getPacksThunk } from '../../redux/packs-reducer';
import {useDispatch} from "react-redux";


export const Packs = (props:any) => {

    const dispatch = useDispatch();

    const getAllPacks = () => {

        let test = {
            sortPacks: 0,
            page: 1,
            pageCount: 10,
        }

        dispatch(getPacksThunk(test));
    }

    return (
        <div className="">
            Packs
            <button onClick={getAllPacks}>test</button>
        </div>
    )
};