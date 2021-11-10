import React from "react";
import { Button, Container, Input, Table, Form, FormGroup, Col, Row } from 'reactstrap';
import BarraNavegacao from "../../components/navBar/barraNavegacao";
import Pesquisa from "../../components/pesquisa/pesquisa";

class Selecionado extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mercados: [
                {
                    nome: "Angeloni",
                    valor: 12.59
                },
                {
                    nome: "Fort Atacadista",
                    valor: 9.90
                },
                {
                    nome: "Giassi",
                    valor: 9.90
                },
                {
                    nome: "Imperatriz",
                    valor: 11.40
                }
            ]
        }
    }
    
    render() {
        const { mercados } = this.state;

        return (
            <>
                <BarraNavegacao />
                <Pesquisa />
                <br /><br />
                <Container>
                    <h2>Você selecionou o produto "Ovos - Caixa com 12 unidades"</h2>
                    <hr />
                    <Form>
                        <FormGroup row>
                            <Table row hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Supermercado</th>
                                        <th>Valor</th>
                                        <th>Qtd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mercados.map((mercado, index) => {
                                        return (
                                            <tr>
                                                <th key={index}>
                                                    <FormGroup check>
                                                        <Input
                                                            id="checkbox2"
                                                            type="checkbox"
                                                        />
                                                        {' '}
                                                    </FormGroup>
                                                </th>
                                                <td>{mercado.nome}</td>
                                                <td>{mercado.valor}</td>
                                                <td>
                                                    <Col sm={2}>
                                                        <Input sm={10} type="number"></Input>
                                                    </Col>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </FormGroup>
                    </Form>

                </Container>
            </>
        )//fim do return
    }//fim do render

}


export default Selecionado;