import React, { Fragment } from "react";
import { Button, Container, Input } from 'reactstrap';
import BarraNavegacao from "../../components/navBar/barraNavegacao";
import SearchBox from "../../components/pesquisa/SearchBox";
import Produtos from "../listaProdutos/Produtos";
import Selecionado from "../selecionado/Selecionado";

class Inicio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search_box_text: "",
            id_produto_text: ""
        }
        this.searchBoxHandler = this.searchBoxHandler.bind(this);
        this.idProdutoHandler = this.idProdutoHandler.bind(this);

    }


    searchBoxHandler(input_text) {
        // console.log("dentro do da página Início: " + input_text)
        this.setState({
            search_box_text: input_text
        });
    }

    idProdutoHandler(id_produto) {
        console.log("dentro da página Início: " + id_produto)
        this.setState({
            id_produto_text: id_produto
        });
    }


    render() {
        const { id_produto_text } = this.state;

        if (id_produto_text <= 0) {
            return (
                <>
                    <Fragment>
                        <BarraNavegacao />
                        <SearchBox input_text={this.searchBoxHandler} />
                        <Produtos
                            id_produto={this.idProdutoHandler}
                            search_box_text={this.state.search_box_text} />

                    </Fragment>
                </>
            )//fim do return
        } else {
            return (
                <>
                    <BarraNavegacao />
                    <Selecionado id_produto_text={this.state.id_produto_text}/>
                </>
            )
        }//fim do else
    }//fim do render
}//fim da classe inicio


export default Inicio;