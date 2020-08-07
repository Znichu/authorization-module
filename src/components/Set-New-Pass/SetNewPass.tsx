import React, {useCallback} from 'react';
import style from "./SetNewPass.module.css";
import {Controller, useForm} from "react-hook-form";
import {Button, Input} from "antd";
import {yupResolver} from "@hookform/resolvers";
import {schemaSetNewPassForm} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../redux/set-new-pass-reducer";
import {AppStateType} from "../../redux/store";
import {Redirect} from 'react-router-dom';

type SetNewPassType = {
    password: string
    passwordConfirmation: string
}

export const SetNewPass = () => {

    const {handleSubmit, errors, control, reset} = useForm<SetNewPassType>({
        resolver: yupResolver(schemaSetNewPassForm)
    });
    const onSubmit = (data: SetNewPassType) => {
        sendNewPass(data.password);
    };
    const {success, isFetching} = useSelector((state: AppStateType) => state.restPass);

    const dispatch = useDispatch();
    const sendNewPass = useCallback(
        (data) => dispatch(resetPassword(data)),
        [dispatch]
    )

    if (success) {
        return <Redirect to='/sign-in'/>
    }
    return (
        <div className={style.setNewPassPage}>
            <div className={style.setNewPassPage__info}>
                <h3>Choose a New Password</h3>
                <span>Create a new password that is at least 8 characters long</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.setNewPassPage__form}>
                <Controller
                    as={Input.Password}
                    name="password"
                    type='password'
                    control={control}
                    placeholder="Password"
                />
                <p>{errors.password?.message}</p>

                <Controller
                    as={Input.Password}
                    type='password'
                    name="passwordConfirmation"
                    control={control}
                    placeholder="Confirm password"
                />
                <p>{errors.passwordConfirmation?.message}</p>
                <Button onClick={ () => reset() } loading={isFetching} htmlType='submit' type="primary">Continue</Button>
            </form>
        </div>
    );
};