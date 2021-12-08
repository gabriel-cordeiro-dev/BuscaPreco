import React from "react";
import { Button, Container, Card, CardBody, CardGroup, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Footer from "../../components/footer/footer";
import NavBarLogado from "../../components/navBar/NavBarLogado";
import { getToken } from "../../utils/auth";
import MyList from "./MyList";


class Listas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carrinhos: [],
            id_lista: '',
            index: ''
            // id_mercado: this.props.id_mercado_text,
            // id_produtos: this.props.id_produto_text,
            // quantidade: this.props.quantidade
        }

        this.setLista = this.setLista.bind(this);
    }

    setLista = (id_lista, index) => {
        console.log("Id da lista = "+id_lista)
        console.log("index = "+index)

        this.setState({
            id_lista,
            index
        })
    }

    componentDidMount() {
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`https://listar-application.herokuapp.com/carrinhos/minhalista`, options)
            .then(listas =>
                listas.json().then(data => this.setState(state => ({
                    carrinhos: data['carrinhos']
                })
                ))
            )
    }

    render() {
        const { carrinhos, index } = this.state;

        if (index <= 0) {
            return (
                <>
                    <NavBarLogado />
                    <br /><br />
                    <Container>
                        <h1>Minhas Listas</h1>
                        <hr />
                        {carrinhos.map((lista, index) => {
                            return (
                                <CardGroup>
                                    <Card className="mb-3">
                                        <CardBody>
                                            <CardTitle key={index} tag="h3">
                                                index = {index+1}
                                            </CardTitle>
                                            <CardTitle tag="h5">
                                                id da lista = {lista.id}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                Quantidade de produtos: {lista.quantidade}
                                            </CardSubtitle>
                                            <CardText>
                                                Valor total: R$ {lista.valor_total}
                                            </CardText>
                                            <Button
                                                onClick={() => this.setLista(lista.id, index+1)}
                                                className="m-lg-3">
                                                Editar
                                            </Button>
                                            <Button color="danger">
                                                Excluir
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            )
                        })}
                    </Container>
                    <Footer />
                </>
            )//fim do 1º return
        } else {
            return (
                <>
                    <MyList
                        id_lista_text={this.state.id_lista}
                        index_text={this.state.index}
                    />

                </>
            )
        }
    }//fim do render

}//fim da classe produtos


export default Listas;