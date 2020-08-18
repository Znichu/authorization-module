import * as React from 'react';
import {memo, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {schemaAddNewCardPackForm} from "../../../../utils/validators/validators";
import {Alert, Button, Checkbox, Input, Radio} from "antd";
import s from './AddPackForm.module.scss'
import {addCardPackType} from "../../../../utils/Types/PacksTypes/PacksTypes";
import {addNewPackThunk} from "../../../../redux/packs-reducer";

export const AddPackForm = memo((props: any) => {

    const dispatch = useDispatch();

    const addNewCardPackCallback = useCallback((newCardPackData) => {
        dispatch(addNewPackThunk(newCardPackData));
    }, [dispatch]);

    const {handleSubmit, errors, control} = useForm<any>({
        resolver: yupResolver(schemaAddNewCardPackForm)
    });

    const onSubmit = (data: addCardPackType) => {
        addNewCardPackCallback(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.AddPackForm}>

                <Controller as={<Input addonBefore="Name:" className={s.packParam}/>}
                            name="name"
                            control={control}
                            placeholder="default = no Name"
                />
                {errors.name && <Alert closable={true}
                                       type={"warning"}
                                       message={errors.name.message}
                                       className={s.errAlert}/>}

                <Controller as={<Input addonBefore="Path:" className={s.packParam}/>}
                            name="path"
                            control={control}
                            placeholder="default = /def"
                />
                {errors.path && <Alert closable={true}
                                       type={"warning"}
                                       message={errors.path.message}
                                       className={s.errAlert}/>}

                <Controller name="grade"
                            control={control}
                            render={(props): any => {
                                return (
                                    <div className={`${s.gradeGroup} ${s.packParam}`}>
                                        <div>Grade:</div>
                                        <Radio.Group name="gradeGroup"
                                                     defaultValue={0}
                                                     onChange={e => props.onChange(e.target.value)}>
                                            <Radio value={0}>0</Radio>
                                            <Radio value={1}>1</Radio>
                                            <Radio value={2}>2</Radio>
                                            <Radio value={3}>3</Radio>
                                            <Radio value={4}>4</Radio>
                                            <Radio value={5}>5</Radio>
                                        </Radio.Group>
                                    </div>
                                );
                            }}
                />
                {errors.grade && <Alert closable={true}
                                        type={"warning"}
                                        message={errors.grade.message}
                                        className={s.errAlert}/>}

                <Controller as={<Input addonBefore="Shots:" className={s.packParam}/>}
                            name="shots"
                            control={control}
                            placeholder="default = 0"
                />
                {errors.shots && <Alert closable={true}
                                        type={"warning"}
                                        message={errors.shots.message}
                                        className={s.errAlert}/>}

                <Controller as={<Input addonBefore="DeckCover:" className={s.packParam}/>}
                            name="deckCover"
                            control={control}
                            placeholder="default = url or base64"
                />
                {errors.deckCover && <Alert closable={true}
                                            type={"warning"}
                                            message={errors.deckCover.message}
                                            className={s.errAlert}/>}

                <Controller name="private"
                            control={control}
                            render={(props): any => (
                                <Checkbox onChange={e => props.onChange(e.target.checked)}
                                          checked={props.value} className={s.packParam}>Private</Checkbox>
                            )}
                />

                <Controller as={<Input addonBefore="Type:" className={s.packParam}/>}
                            name="type"
                            control={control}
                            placeholder="default = pack"
                />
                {errors.type && <Alert closable={true}
                                       type={"warning"}
                                       message={errors.type.message}
                                       className={s.errAlert}/>}

                <Button htmlType='submit' type="primary" className={s.Create}>Create</Button>
            </form>
        </div>
    )
        ;

});