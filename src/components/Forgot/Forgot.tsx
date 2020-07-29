import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {Button, Input, Alert} from 'antd';
import style from './Forgot.module.css'
import {Link} from "react-router-dom";

type Props = {};

type InputEmailType = {
    email: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
});

export const Forgot: React.FC<Props> = (props) => {
    const {handleSubmit, errors, control} = useForm<InputEmailType>({ resolver: yupResolver(schema) });
    const onSubmit = (data: InputEmailType) => console.log(data);

    return (
        <div className={style.forgotPage}>
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