// import React from "react";
// import { Button, Form, Container, Card, CardImg, CardBody, CardGroup, CardTitle, CardSubtitle, CardText } from 'reactstrap';
// import Footer from "../../components/footer/footer";
// import NavBarLogado from "../../components/navBar/NavBarLogado";
// import { getToken } from "../../utils/auth";


// class Listas extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             // carrinhos: [],
//             id_lista: '',
//             // id_mercado: this.props.id_mercado_text,
//             // id_produtos: this.props.id_produto_text,
//             // quantidade: this.props.quantidade
//         }

//         // this.setLista = this.setLista.bind(this);
//         // this.handleSubmit = this.handleSubmit.bind(this)
//     }

//     // setLista = (id_lista) => {
//     //     this.setState({
//     //         id_lista
//     //     })
//     // }


//     // componentDidMount() {
//     //     const token = getToken();
//     //     const options = {
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             'Authorization': `Bearer ${token}`
//     //         }
//     //     }
//     //     fetch(`https://backend-listar.herokuapp.com/carrinhos/minhalista`, options)
//     //         .then(listas =>
//     //             listas.json().then(data => this.setState(state => ({
//     //                 carrinhos: data['carrinhos']
//     //             })
//     //             ))
//     //         )
//     // }

//     render() {
//         // const { carrinhos } = this.state;

//         return (
//             <>
//                 <NavBarLogado />
//                 <br /><br />
//                 <Container>
//                     <h1>Lista nº ID</h1>
//                     <hr />
//                     {/* {carrinhos.map((lista) => { */}
//                         {/* return ( */}
//                             <Form onSubmit={this.handleSubmit}>
//                                 <CardGroup>
//                                     <Card className="mb-3">
//                                         <CardBody>
//                                             <CardTitle tag="h5">
//                                                 id da lista = {lista.id}
//                                             </CardTitle>
//                                             <CardSubtitle
//                                                 className="mb-2 text-muted"
//                                                 tag="h6"
//                                             >
//                                                 Quantidade de produtos: {lista.quantidade}
//                                             </CardSubtitle>
//                                             <CardText>
//                                                 Valor total: R$ {lista.valor_total}
//                                             </CardText>
//                                             <Button
//                                                 id="submit" type="submit"
//                                                 onClick={() => this.setLista(lista.id)}
//                                                 className="m-lg-3">
//                                                 Editar
//                                             </Button>
//                                             <Button color="danger">
//                                                 Excluir
//                                             </Button>
//                                         </CardBody>
//                                     </Card>
//                                 </CardGroup>
//                             </Form>
//                         )
//                     })}
//                 </Container>
//                 <Footer />
//             </>
//         )
//     }//fim do render

//     handleSubmit(e) {
//         const { id_lista } = this.state;
//         console.log(id_lista)
//         const token = getToken()
//         const options = {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify(this.state)
//         }

//         fetch(`https://backend-listar.herokuapp.com/carrinhos/${id_lista}/adicionarProduto`, options)
//             .then(res => {
//                 if (!res.ok && res.status === 401) {
//                     alert('ERRO')
//                 }
//                 console.log("Passou Id da lista");
//                 return res.json()
//             }).then(data => {
//                 alert("Adicionou")
//                 window.location.reload();
//             }).catch(err => console.log(err))

//         e.preventDefault()
//     }//fim do método handleSubmit


// }//fim da classe produtos


// export default Listas;