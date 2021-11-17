import React, { Fragment } from "react";
import { Button, Container, Input } from 'reactstrap';
import BarraNavegacao from "../../components/navBar/barraNavegacao";
import SearchBox from "../../components/pesquisa/SearchBox";
import Produtos from "../listaProdutos/listaProd";

class Inicio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search_box_text: ""
        }
        this.searchBoxHandler = this.searchBoxHandler.bind(this);

    }


    searchBoxHandler(input_text) {
        // console.log("dentro do da página Início: " + input_text)
        this.setState({
            search_box_text: input_text
        });
    }

    render() {
        return (
            <>
                <Fragment>
                    <BarraNavegacao />
                    <SearchBox input_text={this.searchBoxHandler} />
                    <Produtos search_box_text={this.state.search_box_text}/>
                </Fragment>

            </>
        )//fim do return
    }//fim do render
}//fim da classe inicio


export default Inicio;