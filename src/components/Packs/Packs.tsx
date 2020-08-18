import * as React from 'react';
import {addNewPackThunk, setPacksThunk, deleteCardPackThunk} from '../../redux/packs-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {memo, useCallback, useEffect} from "react";
import {Button, Space, Table} from 'antd';
import s from './Packs.module.scss'
import {NavLink, Redirect} from "react-router-dom";
import {cardPacksDataType, recordType} from "../../utils/Types/PacksTypes/PacksTypes";
import {AddPack} from "./AddPack/AddPack";


export const Packs: React.FC = memo((props) => {

    const dispatch = useDispatch();
    const cardPacksData = useSelector((state: AppStateType) => state.packs);
    const authUserId = useSelector((state: AppStateType) => state.singInReducer._id);
    const isFetching = useSelector((state: AppStateType) => state.packs.isFetching);
    const errorMessage = useSelector((state: AppStateType) => state.packs.errorMessage);

    useEffect(() => {
        dispatch(setPacksThunk({}));
    }, []);

    const onChangeTableParams = useCallback((pagination: any, sorter: any, extra: any) => {
        //We get object or array. We should found value of grade filter and return 0 or 1
        const sortPacksDefine = () => {
            if (extra.length >= 2) {
                const gradeParam = extra.filter((sorterParam: any) => sorterParam.field === 'grade');
                return gradeParam[0].order;
            } else {
                return extra.field === 'grade' ? extra.order : null;
            }
        };

        const sortPacks = sortPacksDefine() ? (sortPacksDefine() === 'ascend' ? 1 : 0) : 1;
        const page = pagination.current;
        const pageCount = pagination.pageSize;

        dispatch(setPacksThunk({page, pageCount, sortPacks}));
    }, [dispatch]);

    const deleteCardPack = useCallback((packId: string) => {
        dispatch(deleteCardPackThunk(packId));
    }, [dispatch]);

    const {cardPacks, cardPacksTotalCount, page, pageCount} = cardPacksData as cardPacksDataType;

    const pagination: any = {
        current: page,
        pageSize: pageCount,
        total: cardPacksTotalCount,
        position: ["bottomCenter"]
    };

    const dataSource = cardPacks.map((cardPack, index) => ({
        key: `${cardPack._id}_${index}`,
        name: cardPack.name,
        grade: cardPack.grade,
        userId: cardPack.user_id,
        cardPackId: cardPack._id
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
            title: <AddPack />,
            render: (record: recordType) => (
                <Space size='middle' className={s.cardPackColumnParams}>
                    <Button type="primary"
                            danger
                            onClick={() => deleteCardPack(record.cardPackId)}
                            disabled={authUserId !== record.userId}>delete</Button>
                    <Button type="primary"
                            disabled={authUserId !== record.userId}>update</Button>
                    <NavLink to={''}>Cards</NavLink>
                    <NavLink to={''}>Learn</NavLink>
                </Space>
            ),
        }
    ];

    return (
        <>
            {authUserId ?
                <div className="">
                    <Table dataSource={dataSource}
                           columns={columns}
                           pagination={pagination}
                           loading={isFetching}
                           onChange={onChangeTableParams}
                    />
                </div>
                : <Redirect to={'/sign-in'}/>
            }
        </>
    )
});