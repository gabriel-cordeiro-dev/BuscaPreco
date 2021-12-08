import React from "react";
import { Button, Container, Input, Table, Form, FormGroup, Col } from 'reactstrap';
import { getToken } from "../../utils/auth";
import MyLists from "../listas/MyLists";

class Selecionado extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id_mercado: '',
            id_produtos: this.props.id_produto_text,
            quantidade: '',
            disabled: true,
            mercados: [],
        }

        this.setIds = this.setIds.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            quantidade: event.target.value,
            disabled: false
        });
    }

    setIds = (id_mercado) => {
        this.setState({
            id_mercado
        })
    }

    componentDidMount() {
        const id_produto = this.props.id_produto_text;
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`https://listarapplication.herokuapp.com/produtos/${id_produto}`, options)
            .then(mercados =>
                mercados.json().then(data => this.setState(state => ({
                    mercados: data['mercado_has_produtos']
                })
                ))
            )
    }

    render() {
        const { mercados } = this.state;
        const nome_produto = this.props.nome_produto_text;

        const id_mercado = this.state.id_mercado;
        // const id_produto = this.state.id_produtos;
        // const quantidade = this.state.quantidade;

        // console.log(id_mercado);
        // console.log(id_produto);
        // console.log(quantidade);

        if (id_mercado <= 0) {
            return (
                <>
                    <br /><br />
                    <Container>
                        <h2>Você selecionou o produto "{nome_produto}"</h2>
                        <hr />
                        <Form>
                            <FormGroup row>
                                <Table row hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Supermercado</th>
                                            <th>Valor</th>
                                            <th>Qtd</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mercados.map((mercados) => {
                                            return (
                                                <tr>
                                                    <td>{mercados.mercado.mercado_nome}</td>
                                                    <td>
                                                        R$ {mercados.preco_produto}
                                                    </td>
                                                    <td>
                                                        <Col sm={2}>
                                                            <Input sm={10} type="number" name="quantidade" onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            onClick={() => this.setIds(mercados.mercado.id)}>
                                                            Adicionar
                                                        </Button>
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
            )//fim do 1º return
        } else {
            return (
                <>
                    <MyLists
                        id_mercado_text={this.state.id_mercado}
                        id_produto_text={this.state.id_produtos}
                        quantidade={this.state.quantidade}
                    />

                </>
            )
        }
    }//fim do render



}// fim da classe Selecionado

export default Selecionado;


