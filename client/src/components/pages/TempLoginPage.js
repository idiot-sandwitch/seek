import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../features/user/userSlice";

export const TempLoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, user, status, error } = useSelector((state) => state.auth);

  //Redirect to home page if user already logged in.
  useEffect(() => {
    if (user && token) {
      history.push("/");
    }
  }, [user, token, status]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  //The first route probably won't be rendered, since the page will be fast.
  //But it should be there, just in case.
  if (user && token) {
    return (
      <Container style={{ marginTop: "3rem" }}>
        {" "}
        <Alert variant="success">
          Hello, {user.name}, You're already logged in, happy seeking!
        </Alert>
        <Button href="/" variant="primary">
          Home
        </Button>{" "}
        <Button href="/" variant="danger" onClick={onLogout}>
          Logout
        </Button>
      </Container>
    );
  } else
    return (
      <Container style={{ marginTop: "4rem" }}>
        <Form as="form" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="email"
                type="email"
                placeholder="example@email.com"
                ref={register}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                ref={register}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
};
