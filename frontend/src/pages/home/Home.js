import React from 'react'
import Footer from '../../components/footer/footer.js';
import NavBarLock from '../../components/navBar/NavBarLock.js';
import Carousel from '../../components/carousel/carousel';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

        return (
            <>
                <NavBarLock />
                <Carousel />
                <Footer />
            </>
        )
    }
}

export default Home;