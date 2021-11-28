import React from "react";
import { Nav, NavItem, NavLink, Navbar, NavbarText, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "../../img/logo.jpg"
import './NavBar.css'

const NavBarLock = () => {
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
          <NavLink href="/login">
            Fazer Login
          </NavLink>
        </NavbarText>
          <NavLink id="navRegistro" href="/registro">
            <u>Registrar-se</u>
          </NavLink>
      </Collapse>
    </Navbar>
  )//fim do return
};//fim do const

export default NavBarLock;