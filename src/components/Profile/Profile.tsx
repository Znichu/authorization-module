import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import { Redirect } from 'react-router-dom';

export const Profile = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    if (!isAuth) {
        return <Redirect to='/sign-in'/>
    }

    return (
        <div>
            <div>
                <h3>Profile</h3>
            </div>
            <button >Logout</button>
        </div>
    );
};
