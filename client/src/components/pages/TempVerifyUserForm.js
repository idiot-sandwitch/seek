import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import logo from "../layouts/NavComponents/logo.svg";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyUserEmail } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";

const TempVerifyUserForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (data) => {
    dispatch(verifyUserEmail(data));
  };
  return (
    <Container>
      <Row>
        <Image src={logo} width='200px' height='60px'></Image>
      </Row>
      <Form as='form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId='formHorizontalName'>
          <Form.Label column sm={2}>
            Verification token
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name='token'
              type='text'
              placeholder='enter token sent  to registered email'
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

export default TempVerifyUserForm;
