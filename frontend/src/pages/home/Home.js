import React from 'react'
import Footer from '../../components/footer/footer.js';
import NavBarLock from '../../components/navBar/NavBarLock.js';
import { isAuth } from "../../utils/auth";
import Carousel from '../../components/carousel/carousel';
import NavBarLogado from '../../components/navBar/NavBarLogado.js';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        const Autenticado = isAuth();

        if (Autenticado) {
            return (
                <>
                    <NavBarLogado />
                    <Carousel />
                    <Footer />
                </>
            )
        }
        else {
            return (
                <>
                    <NavBarLock />
                    <Carousel />
                    <Footer />
                </>
            )
        }
    }
}

export default Home;