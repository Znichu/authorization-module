import React from "react"
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {Route, Redirect, RouteComponentProps} from "react-router-dom";

type Props = {
    path: string
    Component: React.FC<RouteComponentProps>
    exact?: boolean
}

const AuthenticationRoute: React.FC<Props> = ({Component, path, exact}) => {
    const isAuth = useSelector((state: AppStateType) => state.profile.isAuth);
    return (
        <Route
            path={path}
            exact={exact}
            render={(props: RouteComponentProps) =>
                isAuth ? <Component { ...props } /> : <Redirect to={'/sign-in'}/>
            }
        />
    )
}

export default AuthenticationRoute