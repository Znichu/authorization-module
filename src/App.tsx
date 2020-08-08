import React, {useEffect} from 'react';
import './App.css';
import {HeaderMenu} from "./components/Menu/Menu";
import {Route, Switch} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {SignIn} from "./components/Sign-In/SignIn";
import {Register} from "./components/Register/Register";
import {Forgot} from "./components/Forgot/Forgot";
import {SetNewPass} from "./components/Set-New-Pass/SetNewPass";
import {useDispatch, useSelector} from "react-redux";
import {getInitializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/store";
import {Preloader} from "./components/Preloader/Preloader";


function App() {
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
                <Route path='/profile' render={() => <Profile />}/>
                <Route path='/sign-in' render={() => <SignIn/>}/>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/forgot' render={() => <Forgot/>}/>
                <Route path='/set-new-password' render={() => <SetNewPass/>}/>
            </Switch>
        </div>
    );
}

export default App;
