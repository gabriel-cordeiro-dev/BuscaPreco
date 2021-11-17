import React from 'react'
import { Button, Container, Row, Col, Label, Form, FormGroup, Input, } from 'reactstrap'
import api from '../../services/api';
import { loginf } from '../../utils/auth';

class Pesquisa extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            busca: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { busca } = this.state
        // try {
        //     const response = await api.post("/login", { busca })
        //     const token = response.data.token
        //     loginf(token)

        //     if (response.status === 200) {
        //         this.props.history.push("/ranking");
        //     }
        // } catch (error) {
        //     console.log(error.response.data)
        //     alert(error.response.data.err)
        // }

    }

    render() {
        return (
            <>
                <Container>
                    <Form initialvalues={{}} onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <br /><br /><Input type="user" id="login" name="login" placeholder="Digite aqui o nome do produto" onChange={this.handleChange} />
                        </FormGroup>
                        <Button
                            block
                            size="lg"
                            color="primary"
                            type="submit"
                            value="pesquisar"
                        >
                            Pesquisar
                        </Button>
                    </Form>
                </Container>
            </>
        );
    }
}

export default Pesquisa;