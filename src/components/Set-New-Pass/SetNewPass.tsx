import React from 'react';
import style from "./SetNewPass.module.css";
import {Controller, useForm} from "react-hook-form";
import {Button, Input} from "antd";
import {yupResolver} from "@hookform/resolvers";
import {schemaSetNewPassForm} from "../../utils/validators/validators";

type SetNewPassType = {
    password: string
    passwordConfirmation: string
}

export const SetNewPass = () => {

    const {handleSubmit, errors, control} = useForm<SetNewPassType>({
        resolver: yupResolver(schemaSetNewPassForm)
    });
    const onSubmit = (data: SetNewPassType) => {
        console.log(data)
    };

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
                <Button htmlType='submit' type="primary">Continue</Button>
            </form>
        </div>
    );
};