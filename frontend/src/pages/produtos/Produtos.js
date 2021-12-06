import React from "react";
import { Button, Container, ListGroup } from 'reactstrap';
import { getToken } from "../../utils/auth";
import "./produto.css"


class Produtos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [],
            produto: ''
        }

        this.setProduto = this.setProduto.bind(this)
    }

    setProduto(id_produto, nome_produto) {
        this.props.produto(id_produto, nome_produto)
    }

    componentDidMount() {
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`https://backend-listar.herokuapp.com/produtos/busca?item_name`, options)
            .then(mercados =>
                mercados.json().then(data => this.setState(state => ({
                    produtos: data['produtos']
                })
                )
                )
            )
    }

    render() {
        let inputText = this.props.search_box_text.toLowerCase();
        let produtosFiltrados = this.state.produtos.filter(
            produto => produto.item_name.toLowerCase().includes(inputText)
        );

        if (produtosFiltrados.length === 0) {
            return (
                <Container>
                    <br /><h1> Nenhum produto encontrado para "{inputText}"</h1>
                </Container>
            )
        } else {
            return (
                <>
                    <br /><br />
                    <Container>
                        <h1>Produtos encontrados</h1>
                        <hr />
                        <ListGroup>
                            {produtosFiltrados.map((lista, index) => {
                                return (

                                    <Button
                                        id="btnProduto"
                                        className="mb-3"
                                        color="primary"
                                        onClick={() => this.setProduto(lista.id, lista.item_name)}
                                    >
                                        <b>{lista.item_name}</b>
                                        {console.log(this.state.id_produto)}
                                    </Button>
                                )
                            })}
                        </ListGroup>
                    </Container>
                </>
            )
        }//fim do else
    }//fim do render
}//fim da classe produtos


export default Produtos;