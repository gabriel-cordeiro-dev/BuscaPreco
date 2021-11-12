import React, { Fragment, useState } from "react";
import { Button, Container, Input, Table, ListGroup, ListGroupItem } from 'reactstrap';
import BarraNavegacao from "../../components/navBar/barraNavegacao";
import Pesquisa from "../../components/pesquisa/pesquisa";

class Produtos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [
                "Ovos - Caixa com 06 unidades", "Ovos - Caixa com 12 unidades", "Detergente Ypê", "Macarrão com Ovos - 300g"
            ]
        }
    }
    render() {
        const { produtos } = this.state;

        return (
            <>
                <BarraNavegacao />
                <Pesquisa />
                <br /><br />
                <Container>
                    <h1>Produtos encontrados</h1>
                    <hr/>
                    <ListGroup>
                            {produtos.map((lista) => {
                                return (
                                    <ListGroupItem
                                        action
                                        tag="a"
                                        href="./selecionado"
                                        key={lista}
                                    >
                                        {lista}</ListGroupItem>
                                )
                            })}
                    </ListGroup>
                </Container>
            </>
        )//fim do return
    }//fim do render

}


export default Produtos;