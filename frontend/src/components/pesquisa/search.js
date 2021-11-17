import React, {useEffect, useState} from "react";
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import axios from "axios";

const Search = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/produtos.json').then((response) => {
            setProdutos(response.data);
        });
    }, []);

    return (
        <>
            <Container>
                    <h1>Produtos encontrados</h1>
                    <hr/>
                    <ListGroup>
                            {produtos.map((lista) => {
                                return (
                                    <ListGroupItem
                                        action
                                        tag="a"
                                        href="./selecionado"
                                        key={lista.name}
                                    >
                                        {lista.name}</ListGroupItem>
                                )
                            })}
                    </ListGroup>
                </Container>
        </>
    );
}//fim do const Search

export default Search;