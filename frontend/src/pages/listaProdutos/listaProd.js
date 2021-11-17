import React, { Fragment, } from "react";
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import BarraNavegacao from "../../components/navBar/barraNavegacao";
import Pesquisa from "../../components/pesquisa/pesquisa";

async function getProdutos(){
    let response = await fetch('http://localhost:5555/produtos/busca?item_name')
    let data = await response.json()
    return data
}

class Produtos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: []
        }
    }

    componentDidMount(){
        getProdutos().then(data => {
            this.setState(state => ({
                produtos: data['produtos']
            }))
        })
    }



    render() {
        const produtos = this.state;
        let inputText = this.props.search_box_text.toLowerCase();
        let produtosFiltrados = this.state.produtos.filter(
            produto => produto.item_name.toLowerCase().includes(inputText)
        );
        // let nomeProdFiltrado = produtosFiltrados.map(p => p.name); --> ver >> -0https://www.youtube.com/watch?v=a-_i3AsuKjw

        if(produtosFiltrados.length === 0){
            return(
                <Container>
                    <br/><h1> Nenhum produto encontrado para "{inputText}"</h1>
                </Container>
            )
        } else{
            return (
                <>
                    <br /><br />
                    <Container>
                        <h1>Produtos encontrados</h1>
                        <hr/>
                        <ListGroup>
                                {produtosFiltrados.map((lista, index) => {
                                    return (
                                        <ListGroupItem
                                            action
                                            tag="a"
                                                href="./selecionado"
                                            key={index}
                                        >
                                            {lista.item_name}</ListGroupItem>
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