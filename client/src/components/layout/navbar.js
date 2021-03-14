import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export const Header = () => {
  return (
    <Navbar
      variant="dark"
      style={{ backgroundColor: "#1f1f1f", position: "top" }}
      fixed="top"
    >
      <Navbar.Brand>SEEK</Navbar.Brand>
      <Nav>
        <Nav.Link href="/resources">RESOURCES</Nav.Link>
        <Nav.Link href="/home">HOME</Nav.Link>
        <Nav.Link href="/teachers">TEACHERS</Nav.Link>
      </Nav>
    </Navbar>
  );
};
