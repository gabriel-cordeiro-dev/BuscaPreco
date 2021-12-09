import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import Footer from '../../components/footer/footer.js';
import NavBarLock from '../../components/navBar/NavBarLock.js';
import Carousel from '../../components/carousel/carousel';
import imgHome from "../../img/imgHome.png"
import './home.css'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        return (
            <>
                {/* <NavBarLock /> */}
                <Row className="mt-5">
                    <Col id="coluna" xs="6">
                        <br/><br/><br/><br/><br/>
                        <div><h1 id="h1Criar">Crie sua própria</h1><br/></div>
                        <h1 className="mb-4" id="lista"><u>Lista de Compras!</u></h1>
                        <Button color="warning" size="lg" className="m-lg-3" href="/login">Login</Button>
                        <Button size="lg"  href="/registro">Criar Conta</Button>
                        <h3 className="mt-4">Compare o preço dos melhores produtos!</h3>
                    </Col>
                    <Col xs="6">
                        <img id="imgHome" src={imgHome} />
                    </Col>
                </Row>
                <hr />
                <Carousel/>
                <Footer />
            </>
        )
    }
}

export default Home;