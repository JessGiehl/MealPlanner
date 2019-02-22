import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Searchbox from './search/Searchbox';

const Header = (props)=>{
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><Link to="/">Meal Planner</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-3">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/menu">Menu</Link></Nav.Link>
          </Nav>
          <Searchbox />
        </Navbar.Collapse>
      </Navbar>

    )

}

export default Header
