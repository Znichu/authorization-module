import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userRegisteration} from "../../redux/register-reducer";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers';
import {AppStateType} from "../../redux/store";
import {Link, Redirect} from 'react-router-dom';
import {useCallback} from "react";
import {Button, Input} from "antd";
import style from './Register.module.css'
import {schemaRegisterForm} from "../../utils/validators/validators";



type IFormInputs = {
    email: string,
    password: string,
    passwordConfirmation: string
}

export const Register = () => {

    const isAuth = useSelector((state: AppStateType) => state.register.success);

    const dispatch = useDispatch();

    const {handleSubmit, errors, control} = useForm<IFormInputs>({
        resolver: yupResolver(schemaRegisterForm)
    });

    const userRegistrationCallback = useCallback((email: string, password: string) =>
            dispatch(userRegisteration(email, password)),
        [dispatch]
    );

    const onSubmit = (data: IFormInputs) => {
        userRegistrationCallback(data.email, data.password);
    };

    if (isAuth) {
        return <Redirect to="/sign-in"/>
    }
    return (
        <div className={style.registerPage}>
            <div>
                <h3>Registration</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.registerPage__form}>
                <Controller
                    as={Input}
                    name="email"
                    control={control}
                    placeholder="Email"
                />
                <p>{errors.email?.message}</p>
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
                <Button htmlType='submit' type="primary">Register</Button>
            </form>
            <Link to='/sign-in'>Sign In</Link>
        </div>
    );
};