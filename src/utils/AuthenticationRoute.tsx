import React from "react"
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {Route, Redirect} from "react-router-dom";

type Props = {
    path: string
    Component: React.FC
    exact?: boolean
}

const AuthenticationRoute: React.FC<Props> = ({Component, path, exact, ...rest}) => {
    const isAuth = useSelector((state: AppStateType) => state.profile.isAuth);
    return (
        <Route
            path={path}
            exact={exact}
            render={() =>
                isAuth ? <Component { ...rest } /> : <Redirect to={'/sign-in'}/>
            }
        />
    )
}

export default AuthenticationRoute