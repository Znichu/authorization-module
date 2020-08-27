import React from 'react';
import './App.css';
import {HeaderMenu} from "./components/Menu/Menu";
import {Route, Switch} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {SignIn} from "./components/Sign-In/SignIn";
import {Register} from "./components/Register/Register";
import {Forgot} from "./components/Forgot/Forgot";
import {SetNewPass} from "./components/Set-New-Pass/SetNewPass";
import {Packs} from './components/Packs/Packs';
import { Cards } from './components/Packs/Cards/Cards';

function App() {
    return (

        <div className='main'>
            <HeaderMenu/>
            <Switch>
                <Route path='/profile' render={() => <Profile/>}/>
                <Route path='/sign-in' render={() => <SignIn/>}/>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/forgot' render={() => <Forgot/>}/>
                <Route path='/set-new-password' render={() => <SetNewPass/>}/>
                <Route path='/packs' exact render={() => <Packs/>}/>
                <Route path='/pack/:packId' render={() => <Cards/>}/>
            </Switch>
        </div>
    );
}

export default App;
