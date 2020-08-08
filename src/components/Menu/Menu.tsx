import React from 'react';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import { NavLink } from "react-router-dom";

export function HeaderMenu() {

    return (
        <Menu mode="horizontal">
            <Menu.Item key="profile">
                <NavLink  to='/profile'>Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="sign-in">
                <NavLink to='/sign-in'>Sign-in</NavLink>
            </Menu.Item>
            <Menu.Item key="forgot">
                <NavLink to='/packs'>Packs</NavLink>
            </Menu.Item>
            <Menu.Item key="set-new-pass">
                <NavLink to='/cards'>Cards</NavLink>
            </Menu.Item>
        </Menu>
    )
}