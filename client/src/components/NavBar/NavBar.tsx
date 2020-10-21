import React from "react";
import RedditLogo from "../../assets/images/reddit-logo.png"

import { Navbar, Form, FormControl, Nav } from "react-bootstrap"

import "./NavBar.scss";

export default function NavBar(){
  return(
    <Navbar bg="light" variant="light" className="nav-bar">
    <Navbar.Brand href="#home" className="nav-bar__logo">
      <img
        src={RedditLogo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        style={{height: "30px", objectFit:"contain", borderRadius:"15px"}}
      />
      <h4>reddit</h4>
    </Navbar.Brand>

    <Form inline className="nav-bar__search">
      <FormControl type="text" placeholder="Search" />
    </Form>

    <Nav className="mr-auto">
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar>
  )
}