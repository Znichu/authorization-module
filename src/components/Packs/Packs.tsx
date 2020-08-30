import React from 'react';
import {setPacksThunk, deleteCardPackThunk, actions} from '../../redux/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/store';
import {memo, ReactElement, ReactText, useCallback, useEffect} from 'react';
import {Button, Space, Table} from 'antd';
import s from './Packs.module.scss'
import {Link, Redirect} from 'react-router-dom';
import {cardPackType, recordType} from '../../utils/Types/PacksTypes/PacksTypes';
import {AddUpdateFormModal} from '../../utils/Modals/AddUpdateCardsPackFormModal/AddUpdateFormModal';
import {AddUpdateForm} from '../../utils/Modals/AddUpdateCardsPackFormModal/AddUpdateForm/AddUpdateForm';
import {SwitchTable} from './SwitchTable/SwitchTable';
import {TablePaginationConfig, ColumnsType, SorterResult} from 'antd/lib/table/interface';
import {action} from "../../redux/menu-reducer";

export const Packs: React.FC = memo((): ReactElement => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action.setSelectedKey('packs'));
    }, [])

    const {
        packs: {
            cardPacks,
            cardPacksTotalCount,
            page,
            pageCount,
            sortPacks,
            isFetching,
            packsToggle
        },
        singInReducer: {_id: authUserId}
    } = useSelector((state: AppStateType) => state);
    const isAuth = useSelector((state: AppStateType) => state.profile.isAuth)

    const user_id = packsToggle && authUserId ? authUserId : '';

    const pagination: TablePaginationConfig = {
        current: page,
        pageSize: pageCount,
        total: cardPacksTotalCount,
        position: ['bottomCenter']
    };

    useEffect(() => {
        dispatch(setPacksThunk({}));

    }, []);

    const switchPacks = useCallback((user_id: string | null, packsToggle: boolean) => {
        dispatch(setPacksThunk({page, pageCount, sortPacks, user_id}));
        dispatch(actions.packsToggleSuccess(packsToggle));
    }, [dispatch, packsToggle]);

    const switchPacksHandler = useCallback(() => {
        if (packsToggle) {
            switchPacks('', false);
        } else {
            switchPacks(authUserId, true);
        }
    }, [packsToggle]);

    const onChangeTableParams = useCallback((pagination: TablePaginationConfig,
                                             sorter: sorterType,
                                             extra: any) => {
        //We get object or array. We should found value of grade filter and return 0 or 1
        const sortPacksDefine = () => {
            if (extra.length >= 2) {
                const gradeParam = extra.filter((sorterParam: { field: string }) => sorterParam.field === 'grade');
                return gradeParam[0].order = gradeParam;
            } else {
                return extra.field === 'grade' ? extra.order : null;
            }
        };
        const sortPacks = sortPacksDefine() ? (sortPacksDefine() === 'ascend' ? 1 : 0) : 1;
        const {current: page, pageSize: pageCount} = pagination;
        dispatch(setPacksThunk({page, pageCount, sortPacks, user_id}));
    }, [dispatch, packsToggle]);


    const deleteCardPack = useCallback((pagination, sortPacks, cardPackId) => {
        const {current: page, pageSize: pageCount} = pagination;
        dispatch(deleteCardPackThunk({page, pageCount, sortPacks, user_id}, cardPackId));
    }, [dispatch, packsToggle]);


    const dataSource = cardPacks.map((cardPack: cardPackType, index: number) => ({
        key: `${cardPack._id}_${index}`,
        name: cardPack.name,
        grade: cardPack.grade,
        userId: cardPack.user_id,
        cardPackId: cardPack._id
    }));

    const columns: columnsType = [
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
                                        params: {type: 'primary', ghost: true}
                                    }}>
                    <AddUpdateForm sortPacks={sortPacks}
                                   pagination={pagination}
                                   user_id={user_id}
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
                                            params: {type: 'primary', disabled: authUserId !== record.userId}
                                        }}>
                        <AddUpdateForm sortPacks={sortPacks}
                                       pagination={pagination}
                                       actionName='Update'
                                       user_id={user_id}
                                       cardPackData={
                                           cardPacks.filter(cardPack => cardPack._id === record.cardPackId)[0]}/>
                    </AddUpdateFormModal>
                    <Link to={`/pack/${record.cardPackId}`}>Cards</Link>
                    <Link to={`/pack`}>Learn</Link>
                </Space>
            ),
        }
    ];

    return (
        <>
            <div className=''>
                <SwitchTable packsToggle={packsToggle}
                             switchPacksHandler={() => switchPacksHandler()}
                />
                <Table dataSource={dataSource}
                       columns={columns}
                       pagination={pagination}
                       loading={isFetching}
                       onChange={onChangeTableParams}
                />
            </div>
            }
        </>
    )
});


//Types
type sorterType = Record<string, ReactText[] | null>;
type columnsType =
    ColumnsType<{ key: string; name: string | null; grade: number | null; userId: string | null; cardPackId: string | null; }>
    | undefined


