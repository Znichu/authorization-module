import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {Button, Input, Alert} from 'antd';
import style from './Forgot.module.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {changePassword} from "../../redux/forgot-reducer";

type InputEmailType = {
    email: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
});

export const Forgot: React.FC = () => {
    const {handleSubmit, errors, control} = useForm<InputEmailType>({ resolver: yupResolver(schema) });
    const onSubmit = (data: InputEmailType) => {
        resetPassword(data.email);
        console.log(data)
    };

    const errorMessage = useSelector((state: AppStateType) => state.forgotPage.errorMessage);
    const dispatch = useDispatch();
    const resetPassword = useCallback(
        (data) => dispatch( changePassword(data) ),
        [dispatch]
    )

    return (
        <div className={style.forgotPage}>
            { errorMessage &&
            <Alert message={errorMessage} type="warning" showIcon closable />
            }

            <h3>Forgot</h3>

            <form className={style.forgotForm} onSubmit={handleSubmit(onSubmit)}>

                <div className={style.error}>
                    { errors.email
                        ? <Alert message={errors.email?.message} type="error" showIcon />
                        : null
                    }
                </div>

                <Controller
                    as={Input}
                    name="email"
                    control={control}
                    placeholder="Email"
                />

                <Button htmlType="submit" type='primary'>Send email</Button>
            </form>
            <Link to={'/sign-in'}>Sign In</Link>
        </div>
    );
};