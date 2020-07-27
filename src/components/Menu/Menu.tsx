import * as React from 'react';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {Link} from "react-router-dom";

export function HeaderMenu() {
    return (
    <Menu mode="horizontal">
        <Menu.Item key="profile">
            <Link to='/profile'>Profile</Link>
        </Menu.Item>
        <Menu.Item key="sign-in">
            <Link to='/sign-in'>Sign-in</Link>
        </Menu.Item>
        <Menu.Item key="register">
            <Link to='/register'>Register</Link>
        </Menu.Item>
        <Menu.Item key="forgot">
            <Link to='/forgot'>Forgot</Link>
        </Menu.Item>
        <Menu.Item key="set-new-pass">
            <Link to='/set-new-pass'>Set new pass</Link>
        </Menu.Item>
    </Menu>
)
}