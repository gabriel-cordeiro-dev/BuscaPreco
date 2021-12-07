import React from "react";
import { Button, Form, Container, Card, Row, Col, CardBody, CardGroup, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Footer from "../../components/footer/footer";
import NavBarLogado from "../../components/navBar/NavBarLogado";
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
        this.handleSubmit = this.handleSubmit.bind(this)
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
        fetch(`https://backend-listar.herokuapp.com/carrinhos/minhalista`, options)
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
                <Container>
                    <Button color="primary" className="mb-3 mt-5">Criar Nova Lista</Button>
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
                <Footer />
            </>
        )
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

        fetch(`https://backend-listar.herokuapp.com/carrinhos/${id_lista}/adicionarProduto`, options)
            .then(res => {
                if (!res.ok && res.status === 401) {
                    alert('ERRO')
                }
                console.log("Adicionou");
                return res.json()
            }).then(data => {
                alert("Adicionou")
                window.location.reload();
            }).catch(err => console.log(err))

        e.preventDefault()
    }//fim do método handleSubmit


}//fim da classe produtos


export default MyLists;