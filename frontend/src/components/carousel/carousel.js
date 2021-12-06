import React from 'react'
import { Container, UncontrolledCarousel } from 'reactstrap'
import img1 from '../../img/1.png'
import img2 from '../../img/2.jpg'
import img3 from '../../img/3.png'
import img4 from '../../img/4.png'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
    
        return (
            <>
                <Container>
                    <br/>
                    <UncontrolledCarousel
                        items={[
                            {
                                key: 1,
                                src: img1
                            },
                            {
                                key: 2,
                                src: img2
                            },
                            {
                                key: 3,
                                src: img3
                            },
                            {
                                key: 4,
                                src: img4
                            }
                        ]}
                    />
                </Container>
            </>
        );
    }
}

export default Carousel;