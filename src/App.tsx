import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css';
//component
import {HeaderMenu} from "./components/Menu/Menu";
import {Profile} from "./components/Profile/Profile";
import {SignIn} from "./components/Sign-In/SignIn";
import {Register} from "./components/Register/Register";
import {Forgot} from "./components/Forgot/Forgot";
import {SetNewPass} from "./components/Set-New-Pass/SetNewPass";
import {Editor} from "./components/Editor/Editor";
import {Preloader} from "./components/Preloader/Preloader";
//
import {getInitializeApp} from "./redux/app-reducer";
//Root state type
import {AppStateType} from "./redux/store";
//Custom route
import AuthenticationRoute from "./utils/AuthenticationRoute";
import {Route, Switch, Redirect} from 'react-router-dom';


function App () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitializeApp())
    }, [dispatch])

    const initialize = useSelector((state: AppStateType) => state.initializeApp.initialize)

    if (!initialize) {
        return <Preloader/>
    }

    return (
        <div className='main'>
            <HeaderMenu/>
            <Switch>
                <Route path='/' exact render={() => <Redirect to='/profile'/>}/>
                <AuthenticationRoute path='/profile' exact={true} Component={ Profile } />
                <AuthenticationRoute path='/editor' exact={true} Component={ Editor } />
                <Route path='/sign-in' exact render={() => <SignIn/>}/>
                <Route path='/register' exact render={() => <Register/>}/>
                <Route path='/forgot' exact render={() => <Forgot/>}/>
                <Route path='/set-new-password' exact render={() => <SetNewPass/>}/>
            </Switch>
        </div>
    );
}

export default App;
