import React from "react";
import { Button, Container, Input, Table, Form, FormGroup, Col } from 'reactstrap';
// import { Redirect } from 'react-router-dom'
import { getToken, loginf } from "../../utils/auth";
import api from '../../services/api';


class Selecionado extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id_mercado: '',
            id_produtos: this.props.id_produto_text,
            quantidade: '',
            // redirect: false,
            disabled: true,
            mercados: [],
        }

        this.setIds = this.setIds.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        fetch(`http://localhost:5555/produtos/${id_produto}`, options)
            .then(mercados =>
                mercados.json().then(data => this.setState(state => ({
                    mercados: data['mercado_has_produtos']})
                ))
            )
    }

    render() {
        const { mercados } = this.state;
        const nome_produto = this.props.nome_produto_text;
        // const { redirect } = this.state

        const id_mercado = this.state.id_mercado;
        const id_produto = this.state.id_produtos;
        const quantidade = this.state.quantidade;

        console.log(id_mercado);
        console.log(id_produto);
        console.log(quantidade);

        // if (redirect) {
        //     return <Redirect to="/busca" />
        // }
        // else {
        return (
            <>
                <br /><br />
                <Container>
                    <h2>Você selecionou o produto "{nome_produto}"</h2>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
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
                                                        id="submit" type="submit" disabled={this.state.disabled}
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
        )//fim do return
        // }//fim do else
    }//fim do render



    handleSubmit(e) {
        const token = getToken()
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }

        fetch("http://localhost:5555/carrinhos", options)
            .then(res => {
                if (!res.ok && res.status === 401) {
                    alert('ERRO')
                }
                console.log("deu certo");
                return res.json()
            }).then(data => {
                alert("deu certo")
                this.setState({ redirect: true })
            }).catch(err => console.log(err))

        e.preventDefault()
    }//fim do método handleSubmit

}// fim da classe Selecionado


export default Selecionado;