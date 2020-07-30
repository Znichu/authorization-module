import * as React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";
import {Checkbox, Alert} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";


type Props = {};

type  LoginData = {
    login: string;
    password: string;
}

const schema = yup.object().shape({
    login: yup.string().required().min(2),
    password: yup.number().positive().integer().required().min(8),
});

export const SignIn = (props: Props) => {

    const {register, handleSubmit, errors} = useForm<LoginData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: LoginData) => console.log(data);

    const testData = useSelector((state: RootState) => state.singInReducer.message);

    return (
        <div>
            <div>
                <h3>SignIn</h3>
                <span>{testData}</span>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Login: </label>
                        <input name="login" type="text" ref={register}/>
                        {errors.login && <Alert message="Login is required" type="error" showIcon/>}
                    </div>
                    <div>
                        <label>Password: </label>
                        <input name="password" type="password" ref={register}/>
                        {errors.password && (
                            <Alert message="Password is required" type="error" showIcon/>)}
                    </div>
                    <div>
                        <Checkbox>Remember Me</Checkbox>
                        <button title="Enter" onClick={handleSubmit(onSubmit)}>Enter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};