import React, {useEffect} from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {Alert, Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../redux/sign-in-reducer";
import {AppStateType} from "../../redux/store";
import {Redirect, Link} from 'react-router-dom';
import style from './SignIn.module.css'
import {schemaSignInForm} from "../../utils/validators/validators";
import {action} from "../../redux/menu-reducer";

//react-hook-form
type  LoginData = {
    email: string;
    password: string;
    rememberMe: boolean
}

//using hook
export const SignIn = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors, control, reset} = useForm<LoginData>({
        resolver: yupResolver(schemaSignInForm)
    });

//dispatch thunk
    const onSubmit = (data: LoginData) => {
        let {email, password, rememberMe} = data;
        dispatch(signIn(email, password, rememberMe));
    };

    //checking logged user or not
    const isAuth = useSelector((state: AppStateType) => state.profile.isAuth);
    const {isFetching, errorMessage} = useSelector((state: AppStateType) => state.singInReducer);

    useEffect(() => { dispatch(action.setSelectedKey('sign-in')) }, [dispatch])


    if (isAuth) {
        return <Redirect to={`/profile`}/>
    }


    return (
        <div className={style.signInPage}>

            <div>
                <h3>SignIn</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.signInPage__form}>
                <div>
                    <Controller
                        as={Input}
                        name="email"
                        control={control}
                        placeholder="Email"
                    />
                    {errors.email && <Alert message="Login is required" type="error" showIcon/>}
                </div>
                <div>
                    <Controller
                        as={Input.Password}
                        name="password"
                        control={control}
                        placeholder="Password"
                    />
                    {errors.password && <Alert message="Password is required" type="error" showIcon/>}
                </div>

                <Link to='/forgot'>Forgot your password?</Link>
                <div>
                    <input type='checkbox' name='rememberMe' ref={register}/>
                    {` Remember me`}
                </div>
                <Button onClick={ () => reset() } loading={isFetching} htmlType='submit' type='primary'>Sign In</Button>
            </form>
            <span>or</span>
            <Link to='/register'>Registration</Link>
        </div>
    );
}