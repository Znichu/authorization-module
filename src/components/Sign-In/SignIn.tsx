import * as React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";
import {Alert} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signOut} from "../../redux/sign-in-reducer";
import {AppStateType} from "../../redux/store";
import {Redirect} from 'react-router-dom';


type Props = {};

type  LoginData = {
    email: string;
    password: string;
    rememberMe: boolean
}

//validation
const schema = yup.object().shape({
    email: yup.string().required().min(2),
    password: yup.string().required().min(8),
});


export const SignIn = (props: Props) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm<LoginData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: LoginData) => {
        let {email, password, rememberMe} = data;
        dispatch(signIn(email, password, rememberMe));
        console.log(data);
    };

    const isAuth = useSelector((state: AppStateType) => state.singInReducer.success);

    return (
        !isAuth ?
            <div>
                <div>
                    <h3>SignIn</h3>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Login: </label>
                            <input name="email" type="text" ref={register}/>
                            {errors.email && <Alert message="Login is required" type="error" showIcon/>}
                        </div>
                        <div>
                            <label>Password: </label>
                            <input name="password" type="password" ref={register}/>
                            {errors.password && <Alert message="Password is required" type="error" showIcon/>}
                        </div>
                        <div>
                            <input type="checkbox" name="rememberMe" ref={register}/>
                            {'Remember me'}
                        </div>
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </div>
            : <Redirect to={`/profile`}/>
    );
};