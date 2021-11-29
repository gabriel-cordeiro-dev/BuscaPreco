import React from "react";
import { Button, Container, Card, CardBody, CardGroup, CardImg, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getToken } from "../../utils/auth";

class MyLists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carrinhos: []
        }

        // this.setListas = this.setListas.bind(this)
    }



    componentDidMount() {
        const token = getToken();
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`http://localhost:5555/carrinhos/minhalista`, options)
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
                <br /><br />
                <Container>
                    <h1>Minhas Listas</h1>
                    <hr />

                    {carrinhos.map((lista) => {
                        return (
                            <CardGroup>
                                <Card>
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
                                        <Button>
                                            Escolher
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
            </>
        )
    }//fim do render
}//fim da classe produtos


export default MyLists;