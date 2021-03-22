import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../../features/user/userSlice";

const TempRegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      history.push("/");
    } else if (user && !token) history.push("/verify");
  }, [user, token, status]);

  const complexityOptions = {
    min: 4,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
  };
  const registerUserSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string()
      .min(7)
      .max(255)
      .email({ tlds: { allow: false } })
      .required(),
    password: passwordComplexity(complexityOptions).required(),
    confirmPassword: passwordComplexity(complexityOptions)
      .valid(Joi.ref("password"))
      .required(),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(registerUserSchema),
  });

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  return (
    <Container style={{ marginTop: "3rem" }}>
      <Form as='form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='name'
              type='text'
              placeholder='John Doe'
              ref={register}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='email'
              type='email'
              placeholder='Email'
              ref={register}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='formHorizontalPassword'>
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='password'
              type='password'
              placeholder='Password'
              ref={register}
            />
            <Form.Control.Feedback type='invalid'>
              This field is required
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalPassword'>
          <Form.Label column sm={2}>
            Confirm Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='confirmPassword'
              type='password'
              placeholder='Re-enter password'
              ref={register}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type='submit'>Create Account</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default TempRegisterPage;
