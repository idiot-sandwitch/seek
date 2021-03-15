import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

export const Header = () => {
  return (
    <Navbar
      variant="dark"
      style={{ backgroundColor: "#1f1f1f", position: "top" }}
      fixed="top"
    >
      <Nav className="ml-3">
        <Nav.Link href="/resources">RESOURCES</Nav.Link>
        <Nav.Link href="/forums" style={{ marginLeft: "6em" }}>
          FORUMS
        </Nav.Link>
      </Nav>
      <Navbar.Brand className="ml-auto mr-3" style={{ fontWeight: "bolder" }}>
        <a href="/home">
          <Image src="seekLogoSmall.png" style={{ width: "5em" }} />
        </a>
      </Navbar.Brand>
      <Nav className="ml-auto mr-3">
        <Nav.Link href="/teachers" style={{ marginRight: "6em" }}>
          TEACHERS
        </Nav.Link>
        <Nav.Link href="/logn">LOGIN</Nav.Link>
      </Nav>
    </Navbar>
  );
};
