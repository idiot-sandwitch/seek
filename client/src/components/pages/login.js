import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Login = () => {
  return (
    <Container style={{ marginTop: "3rem" }}>
      <Container style={{ width: "100%", padding: "1rem" }}>
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h3>Col 1</h3>
          </Col>{" "}
          <Col>
            <h3>Col 1</h3>
          </Col>{" "}
        </Row>
      </Container>
    </Container>
  );
};
