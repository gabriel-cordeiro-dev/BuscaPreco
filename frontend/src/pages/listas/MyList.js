import React from "react";
import { Button, Table, Col, Form, Container, Input, Card, CardBody, CardGroup, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Footer from "../../components/footer/footer";
import NavBarLogado from "../../components/navBar/NavBarLogado";
import { getToken } from "../../utils/auth";
import "./listas.css"

class MyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carrinho: [],
            id_lista: this.props.id_lista_text,
            ind_array: this.props.index_text,
            // id_mercado: this.props.id_mercado_text,
            // id_produtos: this.props.id_produto_text,
            // quantidade: this.props.quantidade
        }

    }

    componentDidMount() {
        const id_lista = this.props.id_lista_text;
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`https://listar-application.herokuapp.com/carrinhos/${id_lista}`, options)
            .then(carrinho =>
                carrinho.json().then(data => this.setState(state => ({
                    carrinho: data['carrinho_has_produtos']
                })
                ))
            )
    }

    render() {
        const { carrinho, ind_array } = this.state;

        return (
            <>
                <NavBarLogado />
                <br /><br />
                <Container id="container">
                    <h1>Lista nº {ind_array}</h1>
                    <br />
                    <Table id="table" row hover responsive>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Alterar Qtd</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrinho.map((lista) => {
                                return (
                                    <tr>
                                        <td>{lista.produto.item_name}</td>
                                        <td>{lista.quantidade}</td>
                                        <td>
                                            <Col sm={2}>
                                                <Input sm={10} type="number" name="quantidade" onChange={this.handleChange}> {lista.quantidade}</Input>
                                            </Col>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => this.handleDelete(lista.produtos_id)}
                                                color="danger"
                                            >
                                                Remover
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
                <footer><Footer /></footer>
            </>
        )
    }//fim do render

    handleDelete(id_produto) {
        const id_lista = this.props.id_lista_text;
        const token = getToken()
        const options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }
        if (window.confirm("Deseja realmente excluir este Produto?")) {
            fetch(`https://listar-application.herokuapp.com/carrinhos/${id_lista}/produtos/${id_produto}`, options)
                .then(res => {
                    if (!res.ok && res.status === 401) {
                        alert('ERRO')
                    }
                    console.log("ERROUU");
                    return res.json()
                }).then(data => {
                    alert("Produto deletado com sucesso!")
                    window.location.reload();
                }).catch(err => console.log(err))
        }

    }//fim do método handleSubmit

}//fim da classe Mylist


export default MyList;