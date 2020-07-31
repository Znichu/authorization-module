import * as React from 'react';
import {useDispatch} from "react-redux";
import {signOut} from "../../redux/sign-in-reducer";

type Props = {};
export const Profile = (props: Props) => {

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signOut)
    };
    return (
        <div>
            <div>
                <h3>Profile</h3>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};