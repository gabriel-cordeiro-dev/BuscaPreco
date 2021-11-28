import React from "react";
import { Nav, NavItem, NavLink, Navbar, NavbarText, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "../../img/logo.jpg"
import imgUsuario from "../../img/usuario.png"
import './NavBar.css'
import { getToken } from "../../utils/auth";


class NavBarLogado extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: ''
    }
  }

//   componentDidMount() {
//     const token = getToken();
//     const options = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     }
//     fetch(`http://localhost:5555/users`, options)
//         .then(usuario  =>
//           usuario.json().then(data => this.setState(state => ({
//                 usuario: data['username']})
//                 )
//             )
//         )
// }

  render() {
    // let usuario = this.state;

    return (
      <Navbar
        color="light"
        expand="md"
        light
      >
        <NavbarBrand href="/">
          <img id="logo" src={logo} />
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() { }} />
        <Collapse navbar>
          <Nav
            className="me-auto"
            navbar
          >
            <NavItem>
              <NavLink href="/login">
                Buscar Produto
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">
                Minhas Listas
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <NavLink id="navLogado">
              <img id="imgUsuario" src={imgUsuario} />
            </NavLink>
          </NavbarText>
          <NavLink>
            {/* {usuario.map((usuario) => {
              return(
                <h4>{usuario.username}</h4>
              )
            })} */}
            Nome do usuário
          </NavLink>
        </Collapse>
      </Navbar>
    )//fim do return
  }//fim do render
}//fim da classe NavBarLogado
export default NavBarLogado;