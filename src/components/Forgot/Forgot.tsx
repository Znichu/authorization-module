import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input} from 'antd';
import style from './Forgot.module.css'
import {Link} from "react-router-dom";

type Props = {};

type InputEmailType = {
    email: string
}

export const Forgot: React.FC<Props> = (props) => {
    const {handleSubmit, errors, control} = useForm<InputEmailType>();
    const onSubmit = (data: InputEmailType) => console.log(data);

    return (
        <div className={style.forgotPage}>
            <form className={style.forgotForm} onSubmit={handleSubmit(onSubmit)}>
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