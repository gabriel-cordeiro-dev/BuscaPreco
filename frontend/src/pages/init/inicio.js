import React, { Fragment } from "react";
import NavBarLogado from "../../components/navBar/NavBarLogado";
import SearchBox from "../../components/pesquisa/SearchBox";
import Produtos from "../produtos/Produtos";
import Selecionado from "../selecionado/Selecionado";
import Footer from '../../components/footer/footer.js';
import '../../components/footer/footer.css'

class Inicio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search_box_text: "",
            id_produto_text: "",
            nome_produto_text: ""
        }
        this.searchBoxHandler = this.searchBoxHandler.bind(this);
        this.produtoHandler = this.produtoHandler.bind(this);

    }

    searchBoxHandler(input_text) {
        this.setState({
            search_box_text: input_text
        });
    }

    produtoHandler(id_produto, nome_produto) {
        console.log("dentro da página Início: " + id_produto)
        this.setState({
            id_produto_text: id_produto,
            nome_produto_text: nome_produto
        });
    }

    render() {
        const { id_produto_text } = this.state;

        if (id_produto_text <= 0) {
            return (
                <>
                    <Fragment>
                        <NavBarLogado />
                        <SearchBox input_text={this.searchBoxHandler} />
                        <Produtos
                            produto={this.produtoHandler} //passa as props id e nome do componente Produtos para a página Início
                            search_box_text={this.state.search_box_text} />
                    <footer><Footer/></footer>
                    </Fragment>
                </>
            )//fim do return
        } else {
            return (
                <>
                    <NavBarLogado />
                    <Selecionado 
                    nome_produto_text={this.state.nome_produto_text} //pega o state da pag inicio e passa para o componente Selecionado
                    id_produto_text={this.state.id_produto_text}/>
                    <footer><Footer/></footer>
                </>
            )
        }//fim do else
    }//fim do render
}//fim da classe inicio


export default Inicio;