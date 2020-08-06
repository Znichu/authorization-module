import * as React from 'react';
import {getPacksThunk} from '../../redux/packs-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useEffect} from "react";
import {Pagination, Table} from 'antd';
import {NavLink} from "react-router-dom";


export const Packs = (props: any) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacksThunk({}))
    }, [])

    const cardPacksData = useSelector((state: AppStateType) => state.packs);
    const {cardPacks, cardPacksTotalCount, page, pageCount} = cardPacksData;


    const dataSource = cardPacks.map((cardPack, index) => (
        {
            key: index,
            name: cardPack.name,
            grade: cardPack.grade,
            delete: <button>Delete</button>,
            update: <button>Update</button>,
            cards: <NavLink to={''}>Cards</NavLink>,
            learn: <NavLink to={''}>Learn</NavLink>,
        }
    ));

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name',},
        {title: 'Grade', dataIndex: 'grade', key: 'grade',},
        {title: 'Delete', dataIndex: 'delete', key: 'delete',},
        {title: 'Update', dataIndex: 'update', key: 'update',},
        {title: 'Cards', dataIndex: 'cards', key: 'cards',},
        {title: 'Learn', dataIndex: 'learn', key: 'learn',},
    ];

    return (
        <div className="">
            <Table dataSource={dataSource} columns={columns}/>;
        </div>
    )

};