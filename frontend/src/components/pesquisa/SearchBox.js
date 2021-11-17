import React from "react";
import { Button, Container, Input } from 'reactstrap';


class SearchBox extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        // this.state = {text_value: ''}
    }

    handleChange(event){
        //console.log(event.target.value);
        this.props.input_text(event.target.value);
    }

    render(){
        return(
            <Container>
                <br/><Input onChange={this.handleChange} placeholder="Digite o nome de um produto"></Input>
            </Container>
            
        )
    }

}//fim da classe SearchBox

export default SearchBox;
