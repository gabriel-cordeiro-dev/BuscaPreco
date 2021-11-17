import React from 'react'

import {Switch, Route, BrowserRouter } from 'react-router-dom'
import inicio from '../pages/init/inicio.js'
import Produtos from '../pages/listaProdutos/listaProd.js'
import Pesquisa from './pesquisa/pesquisa.js'
import Selecionado from '../pages/selecionado/selecionado.js'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={inicio}/>
            <Route exact path="/produtos" component={Produtos}/>
            <Route exact path="/pesquisa" component={Pesquisa}/>
            <Route exact path="/selecionado" component={Selecionado}/>

        </Switch>
    </BrowserRouter>
)

export default Routes