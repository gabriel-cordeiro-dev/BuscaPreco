import React from "react";
import { Nav, NavItem, NavLink, Navbar, NavbarText, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "../../img/logo.png"
import imgUsuario from "../../img/usuario.png"
import './NavBar.css'

class NavBarLogado extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: ''
    }
  }

  render() {
    // let usuario = this.state;
   
    return (
      <Navbar
        className="mb-4"
        id="navBarLogado"
        expand="md"
        light
      >
        <NavbarBrand className="m-lg-3" href="/">
          Início
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() { }} />
        <Collapse navbar>
          <Nav
            className="me-auto"
            navbar
          >
            <NavItem>
              <NavLink className="m-lg-3" href="/busca">
                Buscar Produto
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="m-lg-3" href="/listas">
                Minhas Listas
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <NavLink id="navLogado">
              <img id="imgUsuario" src={imgUsuario} />
            </NavLink>
          </NavbarText>
          <NavLink href="/">
            {/* {usuario.map((usuario) => {
              return(
                <h4>{usuario.username}</h4>
              )
            })} */}
            <u>Sair</u>
          </NavLink>
        </Collapse>
      </Navbar>
    )//fim do return
  }//fim do render
}//fim da classe NavBarLogado
export default NavBarLogado;