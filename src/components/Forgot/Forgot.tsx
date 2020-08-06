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
import {ModalSuccess} from './ModalSuccess/ModalSuccess';

type InputEmailType = {
    email: string
}

export const Forgot: React.FC = () => {
    const {handleSubmit, errors, control} = useForm<InputEmailType>({resolver: yupResolver(schemaForgotPage)});
    const onSubmit = (data: InputEmailType) => {
        resetPassword(data.email);
    };

    const {errorMessage, isFetching, success} = useSelector((state: AppStateType) => state.forgotPage);
/*    const isFetching = useSelector((state: AppStateType) => state.forgotPage.isFetching);
    const success = useSelector((state: AppStateType) => state.forgotPage.success);*/
    const dispatch = useDispatch();
    const resetPassword = useCallback(
        (data) => dispatch(changePassword(data)),
        [dispatch]
    )
    console.log("Render Forgot");

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
                <Button loading={isFetching} htmlType="submit" type='primary'>Send email</Button>
            </form>
            {success ? ModalSuccess() : null}
            <Link to={'/sign-in'}>Sign In</Link>
        </div>
    );
}
