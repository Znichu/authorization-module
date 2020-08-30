import React from 'react';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

export function HeaderMenu() {
    const selectedKey = useSelector((state: AppStateType ) => state.menu.selectedKey);

    return (
        <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
        >
            <Menu.Item key="profile">
                <NavLink  to='/profile'>Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="sign-in">
                <NavLink  to='/sign-in'>Sign-in</NavLink>
            </Menu.Item>
            <Menu.Item key="packs">
                <NavLink  to='/packs'>Packs</NavLink>
            </Menu.Item>
            <Menu.Item key="cards">
                <NavLink  to='/cards'>Cards</NavLink>
            </Menu.Item>
            <Menu.Item key="editor">
                <NavLink  to='/editor'>Editor</NavLink>
            </Menu.Item>
        </Menu>
    )
}