import React from "react";
import { Alert, Button, Form, Container, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getToken } from "../../utils/auth";


class MyLists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carrinhos: [],
            id_lista: '',
            id_mercado: this.props.id_mercado_text,
            id_produtos: this.props.id_produto_text,
            quantidade: this.props.quantidade
        }

        this.setLista = this.setLista.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.newListSubmit = this.newListSubmit.bind(this);
    }

    setLista = (id_lista) => {
        this.setState({
            id_lista
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

        if (carrinhos <= 0) {
            return (
                <Container>
                    <Container>
                        <Alert className="mt-5" color="danger">
                            ATENÇÃO!<br/><hr/>
                            Você não possui Listas, é necessário Criar uma Nova Lista.
                        </Alert>
                    </Container>
                    <Form onSubmit={this.newListSubmit}>
                        <Button
                            id="submit" type="submit"
                            color="primary"
                            className="mb-3 mt-5"
                        > Criar Nova Lista
                        </Button>
                    </Form>
                    <br />
                </Container>
            )
        } else {
            return (
                <>
                    <Container>
                        <Container>
                            <Alert className="mt-5" color="danger">
                                ATENÇÃO!<br/><hr/>
                                Escolha uma lista para adicionar o produto selecionado, ou Crie uma Nova lista!
                            </Alert>
                        </Container>
                        <Form onSubmit={this.newListSubmit}>
                            <Button
                                id="submit" type="submit"
                                color="primary"
                                className="mb-3 mt-5"
                            > Criar Nova Lista
                            </Button>
                        </Form>
                        <hr />
                        <h2 className="mb-4 mt-4">Selecionar uma lista</h2>
                        <hr />

                        {carrinhos.map((lista) => {
                            return (
                                <Form onSubmit={this.handleSubmit}>
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
                                                Escolher
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Form>
                            )
                        })}
                    </Container>
                </>
            )
        }
    }//fim do render

    handleSubmit(e) {
        const { id_lista } = this.state;
        console.log(id_lista)
        const token = getToken()
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }

        fetch(`https://listarapplication.herokuapp.com/carrinhos/${id_lista}/adicionarProduto`, options)
            .then(res => {
                if (!res.ok && res.status === 401) {
                    alert('ERRO')
                }
                console.log("Adicionou");
                return res.json()
            }).then(data => {
                alert("Produto Adicionado!")
                window.location.reload();
            }).catch(err => console.log(err))

        e.preventDefault()
    }//fim do método handleSubmit


    newListSubmit(e) {
        const token = getToken()
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }

        fetch(`https://listarapplication.herokuapp.com/carrinhos`, options)
            .then(res => {
                if (!res.ok && res.status === 401) {
                    alert('ERRO')
                }
                console.log("Criou e adicionou");
                return res.json()
            }).then(data => {
                alert("Lista criada e produto adicionado!")
                window.location.reload();
            }).catch(err => console.log(err))

        e.preventDefault()
    }//fim do método handleSubmit


}//fim da classe produtos


export default MyLists;