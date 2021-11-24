import React from 'react'
import { Button, Container, Row, Col, Label, Form, FormGroup, Input, } from 'reactstrap'
import api from '../../services/api';
import { loginf } from '../../utils/auth';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
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

        const { username, password } = this.state

        try {
            const response = await api.post("/login", { username, password })
            const token = response.data.token
            loginf(token)

            if (response.status === 200) {
                this.props.history.push("/busca");
            }
        } catch (error) {
            console.log(error.response.data)
            alert(error.response.data.err)
        }
    }

    render() {
        return (
            <>
                <Container>
                    <Form initialvalues={{}} onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>

                                    <Label for="username">Login</Label><br />
                                    <Input type="user" id="username" name="username" placeholder="Usuário" onChange={this.handleChange} /> <br />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <Label for="password">Senha</Label><br />
                                    <Input type="password" id="password" name="password" placeholder="Digite sua senha" onChange={this.handleChange} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <br />
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }}>
                                <Button color="warning" size="lg" type="submit" value="Entrar">Entrar</Button>
                                <div id="btnCriar">
                                    <Button href="./Register" color="link">Não possuo conta</Button>
                                </div>
                            </Col>

                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}

export default Login