import * as React from 'react';
import {addNewPackThunk, setPacksThunk, deleteCardPackThunk} from '../../redux/packs-reducer';
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
        //We get object or array. We should found value of grade filter and return 0 or 1
        const sortPacksDefine = () => {
            if (extra.length >= 2) {
                const gradeParam = extra.filter((sorterParam: any) => sorterParam.field === 'grade');
                return gradeParam[0].order;
            } else {
                return extra.field === 'grade' ? extra.order : null;
            }
        };

        const sortPacks = sortPacksDefine() === 'ascend' ? 1 : 0;
        const page = pagination.current;
        const pageCount = pagination.pageSize;
        dispatch(setPacksThunk({page, pageCount, sortPacks}));
    };

    const addNewCardPack = () => {
        dispatch(addNewPackThunk({}));
    }

    const deleteCardPack = (e: any) => {
        const userId = e.currentTarget.closest('tr').getAttribute('data-row-key');
        dispatch(deleteCardPackThunk(userId));
    }

    const {cardPacks, cardPacksTotalCount, page, pageCount} = cardPacksData as cardPacksDataType;
    const pagination: any = {
        current: page,
        pageSize: pageCount,
        total: cardPacksTotalCount,
        position: ["bottomCenter"]
    };

    const dataSource = cardPacks.map((cardPack, index) => ({
        key: cardPack._id,
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
                multiple: 1
            },
        },
        {
            key: 'grade',
            title: 'Grade',
            dataIndex: 'grade',
            sorter: {
                compare: (a: any, b: any) => a.grade - b.grade,
                multiple: 2
            },
        },
        {
            key: 'add',
            title: <button onClick={addNewCardPack}>Add</button>,
            render: () => (
                <Space size='middle' className={s.addColumnParams}>
                    <button onClick={deleteCardPack}>delete</button>
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