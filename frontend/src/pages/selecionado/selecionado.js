import React from "react";
import { Button, Container, Input, Table, Form, FormGroup, Col, Row } from 'reactstrap';

class Selecionado extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mercados: [],
        }
    }

    componentDidMount() {
        const id_produto = this.props.id_produto_text;
        // const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        }
        fetch(`http://localhost:5555/produtos/${id_produto}`, options)
            .then(mercados =>
                mercados.json().then(data => this.setState(state => ({
                    mercados: data['mercado_has_produtos']})
                    )
                )
            )
    }

    render() {
        const { mercados } = this.state;
        const id_produto = this.props.id_produto_text;

        return (
            <>
                <br /><br />
                <Container>
                    <h2>Você selecionou o produto "{id_produto}"</h2>
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
                                    {mercados.map((mercados, index) => {
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
                                                <td>{mercados.mercado.mercado_nome}</td>
                                                <td>{mercados.preco_produto}</td>
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