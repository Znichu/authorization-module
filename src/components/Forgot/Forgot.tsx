import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import {Button, Input, Alert} from 'antd';
import style from './Forgot.module.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {changePassword} from "../../redux/forgot-reducer";
import {schemaForgotPage} from '../../utils/validators/validators';
import {Success} from '../SuccessPage/Success';

type InputEmailType = {
    email: string
}

export const Forgot: React.FC = () => {
    const {handleSubmit, errors, control, reset} = useForm<InputEmailType>({resolver: yupResolver(schemaForgotPage)});
    const onSubmit = (data: InputEmailType) => {
        resetPassword(data.email);
    };

    const {errorMessage, isFetching, success} = useSelector((state: AppStateType) => state.forgotPage);
    const dispatch = useDispatch();
    const resetPassword = useCallback((data) => dispatch(changePassword(data)), [dispatch])
    console.log("Render Forgot");

    if (success) {
        return <Success />
    }

    return (
        <div className={style.forgotPage}>
            {errorMessage &&
            <Alert message={errorMessage} type="warning" showIcon/>
            }
            <h3>Forgot password?</h3>
            <span>Please enter <b>email</b> that you used to sign in</span>
            <form className={style.forgotForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.error}>
                    {errors.email
                        ? <Alert message={errors.email?.message} type="error" showIcon/>
                        : null
                    }
                </div>
                <Controller
                    as={Input}
                    name="email"
                    control={control}
                    placeholder="Email"
                />
                <Button onClick={() => reset()} loading={isFetching} htmlType="submit" type='primary'>Send email</Button>
            </form>
            <Link to={'/sign-in'}>Sign In</Link>
        </div>
    );
}
