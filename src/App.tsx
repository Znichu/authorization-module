import React, {useEffect} from 'react';
import './App.css';
import {HeaderMenu} from "./components/Menu/Menu";
import {Route, Switch, Redirect} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {SignIn} from "./components/Sign-In/SignIn";
import {Register} from "./components/Register/Register";
import {Forgot} from "./components/Forgot/Forgot";
import {SetNewPass} from "./components/Set-New-Pass/SetNewPass";
import {useDispatch, useSelector} from "react-redux";
import {getInitializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/store";
import {Preloader} from "./components/Preloader/Preloader";
import AuthenticationRoute from "./utils/AuthenticationRoute";
import {Packs} from "./components/Packs/Packs";
import {Editor} from "./components/Editor/Editor";



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
                <AuthenticationRoute path='/packs' exact={true} Component={ Packs } />
                <AuthenticationRoute path='/editor' exact={true} Component={Editor} />
                <Route path='/sign-in' exact render={() => <SignIn/>}/>
                <Route path='/register' exact render={() => <Register/>}/>
                <Route path='/forgot' exact render={() => <Forgot/>}/>
                <Route path='/set-new-password' exact render={() => <SetNewPass/>}/>
            </Switch>
        </div>
    );
}

export default App;
