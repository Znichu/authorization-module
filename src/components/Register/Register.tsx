import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userRegisteration} from "../../redux/register-reducer";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";
import {AppStateType} from "../../redux/store";
import {NavLink} from 'react-router-dom';
import {useCallback} from "react";

const schema = yup.object().shape({
    email: yup.string().email().required('test1').min(7),
    password: yup.string().required('test2').min(8),
    passwordConfirmation: yup.string().required('test3').label('Confirm password')
        .test('passwordConfirmation', 'Passwords must match!', function (value) {
            return this.parent.password === value;
        })
});

type IFormInputs = {
    email: string,
    password: string,
    passwordConfirmation: string
}

export const Register = (props: {}) => {

    const isAuth = useSelector((state: AppStateType) => state.register.success);

    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const userRegisterationCallback = useCallback((email: string, password: string) =>
            dispatch(userRegisteration(email, password)),
        [dispatch]
    );

    const onSubmit = (data: IFormInputs) => {
        userRegisterationCallback(data.email, data.password);
    };

    return (
        <>
            {
                isAuth ?
                    <div>
                        <h3>Congrats! You are registered!</h3>
                        <NavLink to="/sign-in">Sign-in</NavLink>
                    </div>
                    :
                    <div>
                        <h3>Registration:</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor={'email'}>Email: </label><br/>
                            <input id="email" type="text" name="email" ref={register}/>
                            <p>{errors.email?.message}</p>

                            <label htmlFor={'password'}>Password: </label><br/>
                            <input id="password" type="text" name="password" ref={register}/>
                            <p>{errors.password?.message}</p>

                            <label htmlFor={'passwordConfirmation'}>Confirm password: </label><br/>
                            <input id="passwordConfirmation" type="text" name="passwordConfirmation" ref={register}/>
                            <p>{errors.passwordConfirmation?.message}</p>

                            <input type="submit"/>
                        </form>
                    </div>
            }
        </>
    );
};