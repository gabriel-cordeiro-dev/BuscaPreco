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
            // id_mercado: '',
            quantidade: this.props.quantidade_text,
            valor_total: this.props.valor_text,
        }
        // this.setMercado = this.setMercado.bind(this);
    }
    
    // setMercado = (mercado) => {
    //     this.setState({
    //         id_mercado: mercado
    //     });
    // }

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
        const { carrinho, ind_array, quantidade, valor_total } = this.state;

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
                                <th>
                                    <Col sm={3}>
                                        Quantidade
                                    </Col>
                                </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrinho.map((lista) => {
                                return (
                                        
                                    <tr>
                                        {/* {this.setMercado(lista.id_mercado)} */}
                                        <td>{lista.nome_produto}</td>
                                        <td>{lista.quantidade}</td>
                                        {/* <td >
                                            <Col>
                                                <Input id="colQtd"  type="number" name="quantidade" onChange={this.handleChange}> {lista.quantidade}</Input>
                                            </Col>
                                        </td> */}
                                        {/* <td>
                                            <Button
                                                onClick={() => this.handleEdit(lista.produtos_id, lista.id_mercado)}
                                                color="warning"
                                            >
                                                Alterar Qtd
                                            </Button>
                                        </td> */}
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
                            <tr>
                                <td>
                                    <b>TOTAL = R$ {valor_total}</b>
                                </td>
                                <td>
                                    <b>{quantidade}</b>
                                </td>
                                
                            </tr>
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
    }//fim do método handleDelete

    // handleEdit(id_produto) {
    //     const id_lista = this.props.id_lista_text;
    //     const id_mercado = this.state;

    //     alert("id_mercado = "+id_mercado)

    //     const token = getToken()
    //     const options = {
    //         method: 'DELETE',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //         body: JSON.stringify(this.state)
    //     }
    //     if (window.confirm("Deseja realmente modificar este Produto?")) {
    //         fetch(`https://listar-application.herokuapp.com/carrinhos/${id_lista}/produtos/${id_produto}`, options)
    //             .then(res => {
    //                 if (!res.ok && res.status === 401) {
    //                     alert('ERRO')
    //                 }
    //                 console.log("ERROUU");
    //                 return res.json()
    //             }).then(data => {
    //                 alert("Produto deletado com sucesso!")
    //                 window.location.reload();
    //             }).catch(err => console.log(err))
    //     }
    // }//fim do método handleEdit



}//fim da classe Mylist


export default MyList;