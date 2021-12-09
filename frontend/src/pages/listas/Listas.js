import React from "react";
import { Button, Container, Card, CardBody, CardGroup, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Footer from "../../components/footer/footer";
import NavBarLogado from "../../components/navBar/NavBarLogado";
import { getToken } from "../../utils/auth";
import MyList from "./MyList";
import "./listas.css"



class Listas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carrinhos: [],
            id_lista: '',
            index: '',
            quantidade:'',
            valor_total:''
        }

        this.setLista = this.setLista.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    setLista = (id_lista, index, quantidade, valor_total) => {
        this.setState({
            id_lista,
            index,
            quantidade,
            valor_total
        });
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
                                    <Card id="cardEdit" className="mb-3">
                                        <CardBody>
                                            <CardTitle key={index} tag="h3">
                                                Lista nº {index + 1}
                                            </CardTitle>
                                            <CardTitle tag="h5">
                                            Quantidade de produtos: {lista.quantidade}
                                            </CardTitle>
                                            <CardText>
                                                Valor total: R$ {lista.valor_total}
                                            </CardText>
                                            <Button
                                                onClick={() => this.setLista(lista.id, index + 1, lista.quantidade, lista.valor_total)}
                                                className="m-lg-3">
                                                Editar
                                            </Button>
                                            <Button
                                                onClick={() => this.handleDelete(lista.id)}
                                                color="danger">
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
                        quantidade_text={this.state.quantidade}
                        valor_text={this.state.valor_total}
                    />

                </>
            )
        }
    }//fim do render

    handleDelete(id_lista) {
        const token = getToken()
        const options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }
        if (window.confirm("Deseja realmente excluir esta lista?")) {
            fetch(`https://listar-application.herokuapp.com/carrinhos/${id_lista}`, options)
                .then(res => {
                    if (!res.ok && res.status === 401) {
                        alert('ERRO')
                    }
                    console.log("ERROUU");
                    return res.json()
                }).then(data => {
                    alert("Lista deletada com sucesso!")
                    window.location.reload();
                }).catch(err => console.log(err))
        }

    }//fim do método handleSubmit

}//fim da classe produtos


export default Listas;