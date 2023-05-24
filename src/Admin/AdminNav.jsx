import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function AdminNav() {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand ><Link to="/Dashboard"> Dashboard  </Link></Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link> <Link to="/category">Category </Link></Nav.Link>
        <Nav.Link> <Link to="/product">Product </Link></Nav.Link>
        <Nav.Link> <Link to="/Order">Order </Link></Nav.Link>
        <Nav.Link> <Link to="/user">User </Link></Nav.Link>
        <Nav.Link> <Link to="/Pub">Publisher </Link></Nav.Link>
      </Nav>
    </Container>
  </Navbar></div>
  )
}

export default AdminNav