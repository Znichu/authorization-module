import * as React from 'react';
import {setPacksThunk, deleteCardPackThunk} from '../../redux/packs-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {memo, ReactElement, useCallback, useEffect} from "react";
import {Button, Space, Table} from 'antd';
import s from './Packs.module.scss'
import {Link, Redirect} from "react-router-dom";
import {cardPackType, recordType} from "../../utils/Types/PacksTypes/PacksTypes";
import {AddUpdateFormModal} from "../../utils/Modals/AddUpdateCardsPackFormModal/AddUpdateFormModal";
import {AddUpdateForm} from "../../utils/Modals/AddUpdateCardsPackFormModal/AddUpdateForm/AddUpdateForm";


export const Packs: React.FC = memo((props): ReactElement => {

    const dispatch = useDispatch();

    const {
        packs: cardPacksData,
        singInReducer: {_id: authUserId}
    } = useSelector((state: AppStateType) => state);


    const {cardPacks, cardPacksTotalCount, page, pageCount, sortPacks, isFetching} = cardPacksData;

    const pagination: any = {
        current: page,
        pageSize: pageCount,
        total: cardPacksTotalCount,
        position: ["bottomCenter"]
    };

    useEffect(() => {
        dispatch(setPacksThunk({}));
    }, []);

    const onChangeTableParams = useCallback((pagination: any, sorter: any, extra: any) => {
        //We get object or array. We should found value of grade filter and return 0 or 1
        const sortPacksDefine = () => {
            if (extra.length >= 2) {
                const gradeParam = extra.filter((sorterParam: any) => sorterParam.field === 'grade');
                return gradeParam[0].order = gradeParam;
            } else {
                return extra.field === 'grade' ? extra.order : null;
            }
        };
        const sortPacks = sortPacksDefine() ? (sortPacksDefine() === 'ascend' ? 1 : 0) : 1;
        const {current: page, pageSize: pageCount} = pagination;
        dispatch(setPacksThunk({page, pageCount, sortPacks}));
    }, [dispatch]);


    const deleteCardPack = useCallback((pagination, sortPacks, cardPackId) => {
        const {current: page, pageSize: pageCount} = pagination;
        dispatch(deleteCardPackThunk({page, pageCount, sortPacks}, cardPackId));
    }, [dispatch]);


    const dataSource = cardPacks.map((cardPack: cardPackType, index: number) => ({
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
            title:
                <AddUpdateFormModal modalTitle='Create a new cards pack'
                                    button={{
                                        name: 'Add',
                                        params: {type: "primary", ghost: true}
                                    }}>
                    <AddUpdateForm sortPacks={sortPacks}
                                   pagination={pagination}
                                   actionName='Create'/>
                </AddUpdateFormModal>,
            render: (record: recordType) => (
                <Space size='middle' className={s.cardPackColumnParams}>
                    <Button type="primary"
                            danger
                            onClick={() => deleteCardPack(pagination, sortPacks, record.cardPackId)}
                            disabled={authUserId !== record.userId}>delete</Button>
                    <AddUpdateFormModal modalTitle='Update a cards pack'
                                        button={{
                                            name: 'update',
                                            params: {type: "primary", disabled: authUserId !== record.userId}
                                        }}>
                        <AddUpdateForm sortPacks={sortPacks}
                                       pagination={pagination}
                                       actionName='Update'
                                       cardPackData={
                                           cardPacks.filter(cardPack => cardPack._id === record.cardPackId)[0]}/>
                    </AddUpdateFormModal>
                    <Link to={`/pack/${record.cardPackId}`}>Cards</Link>
                    <Link to={`/pack/${record.cardPackId}`}>Learn</Link>
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