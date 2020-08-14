import * as React from 'react';
import {addNewPackThunk, setPacksThunk, deleteCardPackThunk} from '../../redux/packs-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useCallback, useEffect} from "react";
import {Button, Space, Table} from 'antd';
import s from './Packs.module.scss'
import {NavLink, Redirect} from "react-router-dom";
import {cardPacksDataType} from "../../utils/Types/PacksTypes/PacksTypes";


export const Packs: React.FC = React.memo((props: any) => {

    const dispatch = useDispatch();
    const cardPacksData = useSelector((state: AppStateType) => state.packs);
    const authUserId = useSelector((state: AppStateType) => state.singInReducer._id);
    const isFetching = useSelector((state: AppStateType) => state.packs.isFetching);
    const errorMessage = useSelector((state: AppStateType) => state.packs.errorMessage);

    const test = () => {
        let deleteCardPackButtons = document.getElementsByClassName('deleteCardPack');
        let updateCardPackButtons = document.getElementsByClassName('updateCardPack');
        for (let i = 0; i < deleteCardPackButtons.length; i++) {
            let trParentTag: any = deleteCardPackButtons[i].closest('tr');
            let userId = trParentTag.getAttribute('data-row-key').split('&')[0];

            if (authUserId !== userId) {
                deleteCardPackButtons[i].setAttribute("disabled", "disabled");
                updateCardPackButtons[i].setAttribute("disabled", "disabled");
            }
        }};


    useEffect(() => {
        
        dispatch(setPacksThunk({}));

        test();

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

    const addNewCardPack = () => {
        dispatch(addNewPackThunk({}));
    }

    const deleteCardPack = (e: any) => {
        const packId = e.currentTarget.closest('tr').getAttribute('data-row-key').split('&')[1];
        dispatch(deleteCardPackThunk(packId));
    }

    const {cardPacks, cardPacksTotalCount, page, pageCount} = cardPacksData as cardPacksDataType;
    const pagination: any = {
        current: page,
        pageSize: pageCount,
        total: cardPacksTotalCount,
        position: ["bottomCenter"]
    };

    const dataSource = cardPacks.map((cardPack) => ({
        key: `${cardPack.user_id}&${cardPack._id}`,
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
                    <Button type="primary"
                            danger
                            onClick={deleteCardPack}
                            className={'deleteCardPack'}
                    >delete</Button>
                    <Button type="primary"
                            className={'updateCardPack'}
                    >update</Button>
                    <NavLink to={''}>Cards</NavLink>
                    <NavLink to={''}>Learn</NavLink>
                </Space>
            ),
        }
    ];

    return (
        <>
            {errorMessage ? <Redirect to={'/sign-in'}/> :
                <div className="">
                    <Table dataSource={dataSource}
                           columns={columns}
                           pagination={pagination}
                           loading={isFetching}
                           onChange={onChangeTableParams}
                    />
                </div>}
        </>
    )
});