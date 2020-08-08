import * as React from 'react';
import {setPacksThunk} from '../../redux/packs-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useEffect} from "react";
import {Space, Table} from 'antd';
import s from './Packs.module.scss'
import {NavLink} from "react-router-dom";
import {cardPacksDataType} from "../../utils/Types/PacksTypes/PacksTypes";


export const Packs = React.memo((props: any) => {

    const dispatch = useDispatch();
    const cardPacksData = useSelector((state: AppStateType) => state.packs);
    const isFetching = useSelector((state: AppStateType) => state.packs.isFetching);

    useEffect(() => {
        dispatch(setPacksThunk({}))
    }, []);

    const onChangeTableParams = (pagination: any, sorter: any, extra: any) => {
        const page = pagination.current;
        const pageCount = pagination.pageSize;
        dispatch(setPacksThunk({page, pageCount}))
    };

    const {cardPacks, cardPacksTotalCount, page, pageCount} = cardPacksData as cardPacksDataType;
    const pagination: any = {
        current: page,
        pageSize: pageCount,
        total: cardPacksTotalCount,
        position: ["bottomCenter"]
    };

    const dataSource = cardPacks.map((cardPack, index) => ({
        key: index,
        name: cardPack.name,
        grade: cardPack.grade,
    }));


    const columns: any = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: {
                compare: (a: any, b: any) => a.name.localeCompare(b.name),
            },
        },
        {
            key: 'grade',
            title: 'Grade',
            dataIndex: 'grade',
            sorter: {
                compare: (a: any, b: any) => a.grade - b.grade,
            },
        },
        {
            key: 'add',
            title: <button>Add</button>,
            render: () => (
                <Space size='middle' className={s.addColumnParams}>
                    <button>delete</button>
                    <button>update</button>
                    <NavLink to={''}>Cards</NavLink>
                    <NavLink to={''}>Learn</NavLink>
                </Space>
            ),
        }
    ];

    return (
        <div className="">
            <Table dataSource={dataSource}
                   columns={columns}
                   pagination={pagination}
                   loading={isFetching}
                   onChange={onChangeTableParams}
            />
        </div>
    )

});