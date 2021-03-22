import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const TempVerifyUserForm = ({ match }) => {
  const history = useHistory();
  const [status, setStatus] = useState("info");
  const [message, setMessage] = useState(
    "We're verifying your token, if there is an error, enter the token sent to the registered email below."
  );
  const token = match.params.token;

  const { register, handleSubmit, errors } = useForm({});
  const verifyUserEmail = async ({ token }) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/verify",
        headers: {
          "Content-Type": "application/json",
          accepts: "application/json",
        },
        data: JSON.stringify({ token }),
      });
      if (res.status === 200) {
        setStatus("success");
        setMessage(res.data);
        toast.success(res.data);
      }
    } catch (err) {
      setStatus("danger");
      setMessage(err.response.data);
    }
  };

  useEffect(() => {
    if (status === "success") history.push("/login");
    if (!token) {
      setStatus("info");
      setMessage(
        "if the link in the email doesn't work, enter the code sent to your email to verify your account"
      );
    } else verifyUserEmail({ token });
  }, [token, status]);

  const onSubmit = (data) => {
    verifyUserEmail(data);
  };
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Row>
        <Alert variant={status}>{message}</Alert>
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
