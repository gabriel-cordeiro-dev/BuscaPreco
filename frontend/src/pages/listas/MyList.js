import React from "react";
import { Button, Form, Container, Card, CardBody, CardGroup, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Footer from "../../components/footer/footer";
import NavBarLogado from "../../components/navBar/NavBarLogado";
import { getToken } from "../../utils/auth";


class MyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carrinhos: [],
            id_lista: this.props.id_lista_text,
            ind_array: this.props.index_text,
            // id_mercado: this.props.id_mercado_text,
            // id_produtos: this.props.id_produto_text,
            // quantidade: this.props.quantidade
        }

    }

    componentDidMount() {
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`https://listarapplication.herokuapp.com/carrinhos/minhalista`, options)
            .then(listas =>
                listas.json().then(data => this.setState(state => ({
                    carrinhos: data['carrinhos']
                })
                ))
            )
    }

    render() {
        const { carrinhos } = this.state;

        return (
            <>
                <NavBarLogado />
                <br /><br />
                <Container>
                    <h1>Lista nº ID</h1>
                    <hr />
                    {carrinhos.map((lista) => {
                        return ( 
                            <Form onSubmit={this.handleSubmit}>
                                <CardGroup>
                                    <Card className="mb-3">
                                        <CardBody>
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
                                                id="submit" type="submit"
                                                onClick={() => this.setLista(lista.id)}
                                                className="m-lg-3">
                                                Editar
                                            </Button>
                                            <Button color="danger">
                                                Excluir
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            </Form>
                        )
                    })}
                </Container>
                <Footer />
            </>
        )
    }//fim do render

}//fim da classe Mylist


export default MyList;