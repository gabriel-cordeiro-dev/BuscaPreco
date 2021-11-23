import React from "react";
import { Redirect } from 'react-router-dom'
import { Button, Container, ListGroup } from 'reactstrap';


async function getProdutos() {
    let response = await fetch('http://localhost:5555/produtos/busca?item_name')
    let data = await response.json()
    return data
}

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
        getProdutos().then(data => {
            this.setState(state => ({
                produtos: data['produtos']
            }))
        })
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
                                        onClick={() => this.setProduto(lista.id, lista.item_name)}
                                    >
                                        {lista.item_name}
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