import * as React from 'react';
import {memo, ReactElement, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {Alert, Button, Checkbox, Input, Radio} from "antd";
import s from './AddUpdateForm.module.scss'
import {addUpdatePackThunk} from "../../../../redux/packs-reducer";
import {schemaAddNewCardPackForm} from "../../../validators/validators";
import {addCardPackType, cardPackType} from "../../../Types/PacksTypes/PacksTypes";
import {TablePaginationConfig} from "antd/lib/table/interface";

export const AddUpdateForm = memo((props: propsType): ReactElement => {

    let {
        sortPacks,
        pagination: {current: page, pageSize: pageCount},
        cardPackData,
        actionName,
        user_id
    } = props;

    const dispatch = useDispatch();

    const addUpdateCardsPackCallback = useCallback((newCardPackData) => {
        const cardPackId = cardPackData ? cardPackData._id : null;
        dispatch(addUpdatePackThunk({
            page,
            pageCount,
            sortPacks,
            user_id
        }, newCardPackData, cardPackId, actionName));
    }, [dispatch, page, pageCount, sortPacks, user_id]);

    const {handleSubmit, errors, control} = useForm({
        resolver: yupResolver(schemaAddNewCardPackForm)
    });

    const onSubmit = (data: addCardPackType) => {
        addUpdateCardsPackCallback(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.AddPackForm}>

                <Controller as={<Input addonBefore="Name:" className={s.packParam}/>}
                            name="name"
                            control={control}
                            placeholder="default = no Name"
                            defaultValue={cardPackData && cardPackData.name}
                />
                {errors.name && <Alert type={"warning"}
                                       message={errors.name.message}
                                       className={s.errAlert}/>}

                <Controller as={<Input addonBefore="Path:" className={s.packParam}/>}
                            name="path"
                            control={control}
                            placeholder="default = /def"
                            defaultValue={cardPackData && cardPackData.path}/>
                {errors.path && <Alert type={"warning"}
                                       message={errors.path.message}
                                       className={s.errAlert}/>}

                <Controller name="grade"
                            control={control}
                            render={(props:gradeRenderType) => (
                                <div className={`${s.gradeGroup} ${s.packParam}`}>
                                    <div>Grade:</div>
                                    <Radio.Group name="gradeGroup"
                                                 defaultValue={cardPackData ? cardPackData.grade : 0}
                                                 onChange={e => props.onChange(e.target.value)}>
                                        <Radio value={0}>0</Radio>
                                        <Radio value={1}>1</Radio>
                                        <Radio value={2}>2</Radio>
                                        <Radio value={3}>3</Radio>
                                        <Radio value={4}>4</Radio>
                                        <Radio value={5}>5</Radio>
                                    </Radio.Group>
                                </div>
                            )}/>
                {errors.grade && <Alert type={"warning"}
                                        message={errors.grade.message}
                                        className={s.errAlert}/>}

                <Controller as={<Input addonBefore="Shots:" className={s.packParam}/>}
                            name="shots"
                            control={control}
                            placeholder="default = 0"
                            defaultValue={cardPackData && cardPackData.shots}/>
                {errors.shots && <Alert type={"warning"}
                                        message={errors.shots.message}
                                        className={s.errAlert}/>}

                <Controller as={<Input addonBefore="DeckCover:" className={s.packParam}/>}
                            name="deckCover"
                            control={control}
                            placeholder="default = url or base64"
                />
                {errors.deckCover && <Alert type={"warning"}
                                            message={errors.deckCover.message}
                                            className={s.errAlert}/>}

                <Controller name="private"
                            control={control}
                            render={(props) => <Checkbox onChange={e => props.onChange(e.target.checked)}
                                                         defaultChecked={cardPackData && cardPackData.private}
                                                         className={s.packParam}>Private</Checkbox>}/>

                <Controller as={<Input addonBefore="Type:" className={s.packParam}/>}
                            name="type"
                            control={control}
                            placeholder="default = pack"
                            defaultValue={cardPackData && cardPackData.type}/>
                {errors.type && <Alert type={"warning"}
                                       message={errors.type.message}
                                       className={s.errAlert}/>}

                <Button htmlType='submit' type="primary" className={s.Create}>{actionName}</Button>
            </form>
        </div>
    );
});


//Types
type propsType = {
    sortPacks: number,
    pagination: TablePaginationConfig,
    cardPackData?: cardPackType,
    actionName: string,
    user_id: string
};
type gradeRenderType = { onChange: (...event: any[]) => void; onBlur: () => void; value: any; };