import React, { Fragment } from "react";
import { Button, Container, Input } from 'reactstrap';
import BarraNavegacao from "../../components/navBar/barraNavegacao";
import Pesquisa from "../../components/pesquisa/pesquisa";


const inicio = () => {
    return (

        <Fragment>
            <BarraNavegacao />
            <Pesquisa/>
        </Fragment>


    )//fim do return
}//fim da classe inicio


export default inicio;