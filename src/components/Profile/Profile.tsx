import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Avatar, Button} from "antd";
import {createFromIconfontCN} from '@ant-design/icons';
import {UserOutlined} from '@ant-design/icons';
import {actions} from "../../redux/profile-reducer";
import saveTokenInCookie from "../../utils/CookieToken/SaveTokenCookie"
import {action} from "../../redux/menu-reducer";

export const Profile = () => {

    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });

    const dispatch = useDispatch();

    const logoutProfile = useCallback(
        () =>
            dispatch(actions.logoutFromProfile(false)),
        [dispatch]
    )
    const logout = () => {
        logoutProfile();
        saveTokenInCookie.remove('auth_token');
    }

    useEffect(() => { dispatch(action.setSelectedKey('profile')) }, [dispatch])

    const {email, name, verified, publicCardPacksCount, avatar} = useSelector((state: AppStateType) => state.profile.profile);

    return (
        <div>
            <div>
                <h3>Profile</h3>
            </div>
            <div>
                {avatar
                    ? <img src={avatar || undefined} alt="profile avatar"/>
                    : <Avatar size={64} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                }
            </div>
            <div>
                <div>
                    <h4>Name</h4>
                    <span>{name}</span>
                </div>
                <div>
                    <h4>Card Pack</h4>
                    <span>{publicCardPacksCount}</span>
                </div>
                <div>
                    <h4>Email</h4>
                    <span>{email}</span>
                </div>
            </div>
            <Button onClick={() => logout()} type="primary" icon={<IconFont type="icon-tuichu"/>}>
                Logout
            </Button>
        </div>
    );
};
