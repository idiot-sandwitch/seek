import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../features/user/userSlice";
import { joiResolver } from "@hookform/resolvers/joi";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";

const TempResetPassword = () => {
  const dispatch = useDispatch();

  const complexityOptions = {
    min: 4,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
  };
  const resetPassSchema = Joi.object({
    old_password: Joi.string().required(),
    new_password: passwordComplexity(complexityOptions)
      .disallow(Joi.ref("old_password"))
      .required(),
    confirm_new_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required(),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(resetPassSchema),
  });

  const onSubmit = (data) => {
    dispatch(resetPassword(data));
  };

  return (
    <Container style={{ marginTop: "4rem" }}>
      <Form as='form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            old Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='old_password'
              type='password'
              placeholder='enter current account password'
              ref={register}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            new password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='new_password'
              type='password'
              placeholder='enter the new  password'
              ref={register}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            confirm password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='confirm_new_password'
              type='password'
              placeholder='re-enter the new password'
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

export default TempResetPassword;
