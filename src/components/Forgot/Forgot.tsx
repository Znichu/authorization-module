import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {Button, Input, Alert} from 'antd';
import style from './Forgot.module.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
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
        const {email} = data;
        resetPassword(email);
        console.log(data)
    };

    const testData = useSelector((state: RootState) => state.forgotPage.testEmail);
    const dispatch = useDispatch();
    const resetPassword = useCallback(
        (data) => dispatch( changePassword(data) ),
        [dispatch]
    )

    return (
        <div className={style.forgotPage}>

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
                    defaultValue={testData}
                />

                <Button htmlType="submit" type='primary'>Send email</Button>
            </form>
            <Link to={'/sign-in'}>Sign In</Link>
        </div>
    );
};