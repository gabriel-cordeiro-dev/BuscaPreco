import React from 'react'
import {Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from '../pages/home/Home.js'
import inicio from '../pages/init/inicio.js'
import Listas from '../pages/listas/Listas.js'
import Login from '../pages/login/Login.js'
import Registro from '../pages/registro/Registro.js'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registro" component={Registro}/>
            <Route exact path="/busca" component={inicio}/>
            <Route exact path="/listas" component={Listas}/>


        </Switch>
    </BrowserRouter>
)

export default Routes