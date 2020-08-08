import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.profile.isAuth
});
type PropsType = {
    isAuth: boolean
}


export const withRedirect = (Component: React.ComponentType) => {
    class RedirectContainer extends React.Component<PropsType> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/sign-in' />;
            return (
                <Component />
            );
        }
    }

    let ConnectRedirectContainer = connect (mapStateToProps, null)(RedirectContainer);

    return ConnectRedirectContainer;
};