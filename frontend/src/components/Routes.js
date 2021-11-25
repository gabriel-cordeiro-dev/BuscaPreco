import React from 'react'

import {Switch, Route, BrowserRouter } from 'react-router-dom'
import inicio from '../pages/init/inicio.js'
import Login from '../pages/login/Login.js'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/busca" component={inicio}/>

        </Switch>
    </BrowserRouter>
)

export default Routes